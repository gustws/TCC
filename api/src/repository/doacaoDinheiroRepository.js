import { con } from "./connection.js";


export async function saveDoacaoDinheiro(doacao) {
  const command = `
    insert into doacao_dinheiro (data_doacao, valor, usuario_id, instituicao_id)
                         values (?, ?, ?, ?)
  `

  const [result] = await con.query(command, [
    doacao.data_doacao,
    doacao.valor,
    doacao.usuario_id,
    doacao.instituicao_id
  ]);

  return result.insertId;
}


export async function getDoacaoDinheiro(id) {
  const command = `
    select id,
           data_doacao,
           valor,
           usuario_id,
           instituicao_id
     from doacao_dinheiro
    where id = ?
  `

  const [linhas] = await con.query(command, [id])
  return linhas[0];
}


export async function listDoacoesDinheiro() {
  const command = `
    select id,
        data_doacao,
        valor,
        usuario_id,
        instituicao_id
     from doacao_dinheiro
  `

  const [linhas] = await con.query(command, [])
  return linhas;
}


export async function listDoacoesDinheiroDetalhado() {
  const command = `
    select d.id,
           d.data_doacao,
           d.valor,
           u.nome as usuario,
           i.nome as instituicao
      from doacao_dinheiro d
      join usuarios u on u.id = d.usuario_id
      join instituicao i on i.id = d.instituicao_id
     order by d.data_doacao desc
  `

  const [linhas] = await con.query(command, [])
  return linhas;
}


export async function updateDoacaoDinheiro(id, doacao) {
  const command = `
    update doacao_dinheiro
       set data_doacao = ?,
           valor = ?,
           usuario_id = ?,
           instituicao_id = ?
     where id = ?
  `

  const [result] = await con.query(command, [
    doacao.data_doacao,
    doacao.valor,
    doacao.usuario_id,
    doacao.instituicao_id,
    id
  ]);
  return result.affectedRows;
}


export async function deleteDoacaoDinheiro(id) {
  const command = `
    delete from doacao_dinheiro where id = ?
  `

  const [result] = await con.query(command, [id])
  return result.affectedRows;
}