import * as db from '../repository/estoqueRepository.js';


export async function saveEstoque(estoque) {
  return db.saveEstoque(estoque);
}


export async function getEstoque(id) {
  return db.getEstoque(id);
}


export async function listEstoque() {
  return db.listEstoque();
}


export async function listEstoqueComAlimento() {
  return db.listEstoqueComAlimento();
}


export async function updateEstoque(id, estoque) {
  return db.updateEstoque(id, estoque);
}


export async function deleteEstoque(id) {
  return db.deleteEstoque(id);
}