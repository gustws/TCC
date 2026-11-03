import { con } from "./connection.js";


export async function saveContato(contato) {
  const command = `
    insert into contatos (nome, email, mensagem)
                  values (?, ?, ?)
  `

  const [result] = await con.query(command, [
    contato.nome,
    contato.email,
    contato.mensagem
  ]);

  return result.insertId;
}


export async function getContato(id) {
  const command = `
    select id,
           nome,
           email,
           mensagem,
           usuario_id,
           instituicao_id
      from contatos
     where id = ?
  `

  const [linhas] = await con.query(command, [id])
  return linhas[0];
}


export async function listContatos() {
  const command = `
    select id,
           nome,
           email,
           mensagem,
           usuario_id,
           instituicao_id
      from contatos
  `

  const [linhas] = await con.query(command, [])
  return linhas;
}


export async function updateContato(id, contato) {
  const command = `
    update contatos
       set nome = ?,
           email = ?,
           mensagem = ?
     where id = ?
  `

  const [result] = await con.query(command, [
    contato.nome,
    contato.email,
    contato.mensagem,
    id
  ]);
  return result.affectedRows;
}


export async function deleteContato(id) {
  const command = `
    delete from contatos
     where id = ?
  `

  const [result] = await con.query(command, [id])
  return result.affectedRows;
}
