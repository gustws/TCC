import { con } from "./connection.js";


export async function saveInstituicao(instituicao) {
  const command = `
    insert into instituicao (nome, cnpj, telefone, endereco, cidade)
                     values (?, ?, ?, ?, ?)
  `

  const [result] = await con.query(command, [
    instituicao.nome,
    instituicao.cnpj,
    instituicao.telefone,
    instituicao.endereco,
    instituicao.cidade
  ]);

  return result.insertId;
}


export async function getInstituicao(id) {
  const command = `
    select id,
           nome,
           cnpj,
           telefone,
           endereco,
           cidade
     from instituicao
    where id = ?
  `

  const [linhas] = await con.query(command, [id])
  return linhas[0];
}


export async function listInstituicoes() {
  const command = `
    select id,
           nome,
           cnpj,
           telefone,
           endereco,
           cidade
     from instituicao
  `

  const [linhas] = await con.query(command, [])
  return linhas;
}


export async function updateInstituicao(id, instituicao) {
  const command = `
    update instituicao
       set nome = ?,
           cnpj = ?,
           telefone = ?,
           endereco = ?,
           cidade = ?
     where id = ?
  `

  const [result] = await con.query(command, [
    instituicao.nome,
    instituicao.cnpj,
    instituicao.telefone,
    instituicao.endereco,
    instituicao.cidade,
    id
  ]);
  return result.affectedRows;
}


export async function deleteInstituicao(id) {
  const command = `
    delete from instituicao where id = ?
  `

  const [result] = await con.query(command, [id])
  return result.affectedRows;
}