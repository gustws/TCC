import { con } from "./connection.js";


export async function saveUsuario(usuario) {
  const command = `
    insert into usuarios (nome, email, senha, telefone)
                  values (?, ?, ?, ?)
  `

  const [result] = await con.query(command, [
    usuario.nome,
    usuario.email,
    usuario.senha,
    usuario.telefone
  ]);

  return result.insertId;
}


export async function getUsuario(id) {
  const command = `
    select id,
           nome,
           email,
           senha,
           telefone
     from usuarios
    where id = ?
  `

  const [linhas] = await con.query(command, [id])
  return linhas[0];
}


export async function listUsuarios() {
  const command = `
    select id,
           nome,
           email,
           senha,
           telefone
     from usuarios
  `

  const [linhas] = await con.query(command, [])
  return linhas;
}


export async function updateUsuario(id, usuario) {
  const command = `
    update usuarios
       set nome = ?,
           email = ?,
           senha = ?,
           telefone = ?
     where id = ?
  `

  const [result] = await con.query(command, [
    usuario.nome,
    usuario.email,
    usuario.senha,
    usuario.telefone,
    id
  ]);
  return result.affectedRows;
}


export async function deleteUsuario(id) {
  const command = `
    delete from usuarios where id = ?
  `

  const [result] = await con.query(command, [id])
  return result.affectedRows;
}