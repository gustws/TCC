import * as db from '../repository/doacaoDinheiroRepository.js';


export async function saveDoacaoDinheiro(doacao) {
  return db.saveDoacaoDinheiro(doacao);
}


export async function getDoacaoDinheiro(id) {
  return db.getDoacaoDinheiro(id);
}


export async function listDoacoesDinheiro() {
  return db.listDoacoesDinheiro();
}


export async function listDoacoesDinheiroDetalhado() {
  return db.listDoacoesDinheiroDetalhado();
}


export async function updateDoacaoDinheiro(id, doacao) {
  return db.updateDoacaoDinheiro(id, doacao);
}


export async function deleteDoacaoDinheiro(id) {
  return db.deleteDoacaoDinheiro(id);
}