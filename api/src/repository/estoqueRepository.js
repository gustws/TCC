import { con } from "./connection.js";


export async function saveEstoque(estoque) {
  const command = `
    insert into estoque (quantidade, alimento_id)
                 values (?, ?)
    on duplicate key update quantidade = values(quantidade)
  `

  const [result] = await con.query(command, [
    estoque.quantidade,
    estoque.alimento_id
  ]);

  return result.insertId;
}


export async function getEstoque(id) {
  const command = `
    select id, quantidade, alimento_id
      from estoque
     where id = ?
  `

  const [linhas] = await con.query(command, [id])
  return linhas[0];
}


export async function listEstoque() {
  const command = `
    select id, quantidade, alimento_id
      from estoque
  `

  const [linhas] = await con.query(command, [])
  return linhas;
}


// todos os alimentos, mesmo os que nunca receberam doação (quantidade 0 = em falta)
export async function listEstoqueComAlimento() {
  const command = `
    select alimentos.id as alimento_id,
           alimentos.nome,
           alimentos.categoria,
           alimentos.unidade,
           coalesce(estoque.quantidade, 0) as quantidade
      from alimentos
      left join estoque
        on estoque.alimento_id = alimentos.id
     order by alimentos.nome
  `

  const [linhas] = await con.query(command, [])
  return linhas;
}


export async function updateEstoque(id, estoque) {
  const command = `
    update estoque
       set quantidade = ?,
           alimento_id = ?
     where id = ?
  `

  const [result] = await con.query(command, [
    estoque.quantidade,
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