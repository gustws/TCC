import { con } from "./connection.js";


export async function saveAlimento(alimentos) {
  const command = `
    insert into alimentos (nome, categoria, unidade)
                   values (?, ?, ?)
  `

  const [result] = await con.query(command, [
    alimentos.nome,
    alimentos.categoria,
    alimentos.unidade
  ]);

  return result.insertId;
}


export async function getAlimento(id) {
  const command = `
    select id,
        nome,
        categoria,
        unidade
     from alimentos
    where id = ?
  `

  const [linhas] = await con.query(command, [id])
  return linhas[0];
}


export async function listAlimentos() {
  const command = `
    select id,
           nome,
           categoria,
           unidade
     from alimentos
  `

  const [linhas] = await con.query(command, [])
  return linhas;
}


export async function updateAlimento(id, alimento) {
  const command = `
    update alimentos
       set nome = ?,
           categoria = ?,
           unidade = ?
     where id = ?
  `

  const [result] = await con.query(command, [
    alimentos.nome,
    alimentos.categoria,
    alimentos.unidade,
    id
  ]);
  return result.affectedRows;
}


export async function deleteAlimento(id) {
  const command = `
    delete from alimentos 
      where id = ?
  `

  const [result] = await con.query(command, [id])
  return result.affectedRows;
}