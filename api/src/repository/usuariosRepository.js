import { con } from "./connection.js";


export async function saveUsuario(usuario) {
  const command = `
    insert into usuarios (nome, email, senha, telefone, admin)
                  values (?, ?, ?, ?, ?)
  `

  const [result] = await con.query(command, [
    usuario.nome,
    usuario.email,
    usuario.senha,
    usuario.telefone,
    usuario.admin ? 1 : 0
  ]);

  return result.insertId;
}


export async function getUsuario(id) {
  const command = `
    select id, nome, email, telefone, admin
      from usuarios
     where id = ?
  `

  const [linhas] = await con.query(command, [id])
  return linhas[0];
}


// único que devolve a senha (hash): usado só no login
export async function getUsuarioPorEmail(email) {
  const command = `
    select id, nome, email, senha, telefone, admin
      from usuarios
     where email = ?
  `

  const [linhas] = await con.query(command, [email])
  return linhas[0];
}


export async function listUsuarios() {
  const command = `
    select id, nome, email, telefone, admin
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
           telefone = ?,
           admin = ?
     where id = ?
  `

  const [result] = await con.query(command, [
    usuario.nome,
    usuario.email,
    usuario.senha,
    usuario.telefone,
    usuario.admin ? 1 : 0,
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