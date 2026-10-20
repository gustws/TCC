import { con } from "./connection.js";


export async function saveDoacaoAlimento(doacao) {
  const command = `
    insert into doacao_alimento (alimento_id, data_doacao, usuario_id, instituicao_id)
                         values (?, ?, ?, ?)
  `

  const [result] = await con.query(command, [
    doacao.alimento_id,
    doacao.data_doacao,
    doacao.usuario_id,
    doacao.instituicao_id
  ]);

  return result.insertId;
}


export async function getDoacaoAlimento(id) {
  const command = `
    select id,
           alimento_id,
           data_doacao,
           usuario_id,
           instituicao_id
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
           data_doacao,
           usuario_id,
           instituicao_id
     from doacao_alimento
  `

  const [linhas] = await con.query(command, [])
  return linhas;
}


export async function listDoacoesAlimentoDetalhado() {
  const command = `
    select doacao_alimento.id, doacao_alimento.data_doacao, alimentos.nome as alimento, usuarios.nome as usuario, instituicao.nome as instituicao
      from doacao_alimento
      inner join alimentos 
        on alimentos.id = doacao_alimento.alimento_id
      inner join usuarios 
        on usuarios.id = doacao_alimento.usuario_id
      inner join instituicao 
        on instituicao.id = doacao_alimento.instituicao_id
     order by doacao_alimento.data_doacao desc
  `

  const [linhas] = await con.query(command, [])
  return linhas;
}


export async function updateDoacaoAlimento(id, doacao) {
  const command = `
    update doacao_alimento
       set alimento_id = ?,
           data_doacao = ?,
           usuario_id = ?,
           instituicao_id = ?
     where id = ?
  `

  const [result] = await con.query(command, [
    doacao.alimento_id,
    doacao.data_doacao,
    doacao.usuario_id,
    doacao.instituicao_id,
    id
  ]);
  return result.affectedRows;
}


export async function deleteDoacaoAlimento(id) {
  const command = `
    delete from doacao_alimento where id = ?
  `

  const [result] = await con.query(command, [id])
  return result.affectedRows;
}