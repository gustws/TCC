import { con } from "./connection.js";
 
 
export async function saveDoacaoDinheiro(doacao) {
  const command = `
    insert into doacao_dinheiro (data_doacao, valor, usuario_id, instituicao_id, nome_doador, email_doador, recorrente)
                         values (?, ?, ?, ?, ?, ?, ?)
  `
 
  const [result] = await con.query(command, [
    doacao.data_doacao,
    doacao.valor,
    doacao.usuario_id ?? null,
    doacao.instituicao_id ?? null,
    doacao.nome_doador ?? null,
    doacao.email_doador ?? null,
    doacao.recorrente ?? 0
  ]);
 
  return result.insertId;
}
 
 
export async function getDoacaoDinheiro(id) {
  const command = `
    select id,
           data_doacao,
           valor,
           usuario_id,
           instituicao_id,
           nome_doador,
           email_doador,
           recorrente
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
        instituicao_id,
        nome_doador,
        email_doador,
        recorrente
     from doacao_dinheiro
  `
 
  const [linhas] = await con.query(command, [])
  return linhas;
}
 
 
export async function listDoacoesDinheiroDetalhado() {
  const command = `
    select doacao_dinheiro.id,
           doacao_dinheiro.data_doacao,
           doacao_dinheiro.valor,
           doacao_dinheiro.recorrente,
           doacao_dinheiro.nome_doador,
           doacao_dinheiro.email_doador,
           usuarios.nome as usuario,
           instituicao.nome as instituicao
      from doacao_dinheiro
      left join usuarios
        on usuarios.id = doacao_dinheiro.usuario_id
      left join instituicao
        on instituicao.id = doacao_dinheiro.instituicao_id
     order by doacao_dinheiro.data_doacao desc
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
           instituicao_id = ?,
           nome_doador = ?,
           email_doador = ?,
           recorrente = ?
     where id = ?
  `
 
  const [result] = await con.query(command, [
    doacao.data_doacao,
    doacao.valor,
    doacao.usuario_id ?? null,
    doacao.instituicao_id ?? null,
    doacao.nome_doador ?? null,
    doacao.email_doador ?? null,
    doacao.recorrente ?? 0,
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