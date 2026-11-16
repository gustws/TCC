import { con } from "./connection.js";


async function emTransacao(fn) {
  const conn = await con.getConnection();
  try {
    await conn.beginTransaction();
    const resultado = await fn(conn);
    await conn.commit();
    return resultado;
  }
  catch (err) {
    await conn.rollback();
    throw err;
  }
  finally {
    conn.release();
  }
}

// soma (ou subtrai, se negativo) no estoque; cria a linha se o alimento ainda não tiver
async function ajustarEstoque(conn, alimento_id, delta) {
  await conn.query(`
    insert into estoque (alimento_id, quantidade)
                 values (?, ?)
    on duplicate key update quantidade = greatest(quantidade + ?, 0)
  `, [alimento_id, Math.max(delta, 0), delta]);
}


export async function saveDoacaoAlimento(doacao) {
  return emTransacao(async (conn) => {
    const [result] = await conn.query(`
      insert into doacao_alimento (alimento_id, quantidade, data_doacao, instituicao_id, nome_doador, email_doador)
                           values (?, ?, ?, ?, ?, ?)
    `, [
      doacao.alimento_id,
      doacao.quantidade,
      doacao.data_doacao,
      doacao.instituicao_id ?? null,
      doacao.nome_doador ?? null,
      doacao.email_doador ?? null
    ]);

    await ajustarEstoque(conn, doacao.alimento_id, doacao.quantidade);
    return result.insertId;
  });
}


export async function getDoacaoAlimento(id) {
  const command = `
    select id,
           alimento_id,
           quantidade,
           data_doacao,
           instituicao_id,
           nome_doador,
           email_doador
     from doacao_alimento
    where id = ?
  `

  const [linhas] = await con.query(command, [id])
  return linhas[0];
}


export async function listDoacoesAlimento() {
  const command = `
    select id,
           alimento_id,
           quantidade,
           data_doacao,
           instituicao_id,
           nome_doador,
           email_doador
     from doacao_alimento
  `

  const [linhas] = await con.query(command, [])
  return linhas;
}


export async function listDoacoesAlimentoDetalhado() {
  const command = `
    select doacao_alimento.id,
           doacao_alimento.data_doacao,
           doacao_alimento.quantidade,
           doacao_alimento.nome_doador,
           doacao_alimento.email_doador,
           alimentos.nome as alimento,
           alimentos.unidade,
           instituicao.nome as instituicao
      from doacao_alimento
      inner join alimentos
        on alimentos.id = doacao_alimento.alimento_id
      left join instituicao
        on instituicao.id = doacao_alimento.instituicao_id
     order by doacao_alimento.data_doacao desc
  `

  const [linhas] = await con.query(command, [])
  return linhas;
}


export async function updateDoacaoAlimento(id, doacao) {
  return emTransacao(async (conn) => {
    const [[antiga]] = await conn.query(
      'select alimento_id, quantidade from doacao_alimento where id = ? for update', [id]);

    if (!antiga) return 0;

    const [result] = await conn.query(`
      update doacao_alimento
         set alimento_id = ?,
             quantidade = ?,
             data_doacao = ?,
             instituicao_id = ?,
             nome_doador = ?,
             email_doador = ?
       where id = ?
    `, [
      doacao.alimento_id,
      doacao.quantidade,
      doacao.data_doacao,
      doacao.instituicao_id ?? null,
      doacao.nome_doador ?? null,
      doacao.email_doador ?? null,
      id
    ]);

    // desfaz o efeito da doação antiga e aplica o da nova
    await ajustarEstoque(conn, antiga.alimento_id, -antiga.quantidade);
    await ajustarEstoque(conn, doacao.alimento_id, doacao.quantidade);

    return result.affectedRows;
  });
}


export async function deleteDoacaoAlimento(id) {
  return emTransacao(async (conn) => {
    const [[antiga]] = await conn.query(
      'select alimento_id, quantidade from doacao_alimento where id = ? for update', [id]);

    if (!antiga) return 0;

    const [result] = await conn.query('delete from doacao_alimento where id = ?', [id]);
    await ajustarEstoque(conn, antiga.alimento_id, -antiga.quantidade);

    return result.affectedRows;
  });
}