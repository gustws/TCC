import { con } from "./connection.js";


export async function saveEstoque(estoque) {
  const command = `
    insert into estoque (quantidade, validade, alimento_id)
                 values (?, ?, ?)
  `

  const [result] = await con.query(command, [
    estoque.quantidade,
    estoque.validade,
    estoque.alimento_id
  ]);

  return result.insertId;
}


export async function getEstoque(id) {
  const command = `
    select id,
           quantidade,
           validade,
           alimento_id
     from estoque
    where id = ?
  `

  const [linhas] = await con.query(command, [id])
  return linhas[0];
}


export async function listEstoque() {
  const command = `
    select id,
           quantidade,
           validade,
           alimento_id
     from estoque
  `

  const [linhas] = await con.query(command, [])
  return linhas;
}


export async function updateEstoque(id, estoque) {
  const command = `
    update estoque
       set quantidade = ?,
           validade = ?,
           alimento_id = ?
     where id = ?
  `

  const [result] = await con.query(command, [
    estoque.quantidade,
    estoque.validade,
    estoque.alimento_id,
    id
  ]);
  return result.affectedRows;
}


export async function deleteEstoque(id) {
  const command = `
    delete from estoque where id = ?
  `

  const [result] = await con.query(command, [id])
  return result.affectedRows;
}