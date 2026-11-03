import { con } from "./connection.js";
 
 
export async function saveDoacaoAlimento(doacao) {
  const command = `
    insert into doacao_alimento (alimento_id, data_doacao, usuario_id, instituicao_id, nome_doador, email_doador)
                         values (?, ?, ?, ?, ?, ?)
  `
 
  const [result] = await con.query(command, [
    doacao.alimento_id,
    doacao.data_doacao,
    doacao.usuario_id ?? null,
    doacao.instituicao_id ?? null,
    doacao.nome_doador ?? null,
    doacao.email_doador ?? null
  ]);
 
  return result.insertId;
}
 
 
export async function getDoacaoAlimento(id) {
  const command = `
    select id,
           alimento_id,
           data_doacao,
           usuario_id,
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
           data_doacao,
           usuario_id,
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
           doacao_alimento.nome_doador,
           doacao_alimento.email_doador,
           alimentos.nome as alimento,
           usuarios.nome as usuario,
           instituicao.nome as instituicao
      from doacao_alimento
      inner join alimentos
        on alimentos.id = doacao_alimento.alimento_id
      left join usuarios
        on usuarios.id = doacao_alimento.usuario_id
      left join instituicao
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
           instituicao_id = ?,
           nome_doador = ?,
           email_doador = ?
     where id = ?
  `
 
  const [result] = await con.query(command, [
    doacao.alimento_id,
    doacao.data_doacao,
    doacao.usuario_id ?? null,
    doacao.instituicao_id ?? null,
    doacao.nome_doador ?? null,
    doacao.email_doador ?? null,
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
 