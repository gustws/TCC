import * as db from '../repository/doacaoAlimentoRepository.js';


export async function saveDoacaoAlimento(doacao) {
  return db.saveDoacaoAlimento(doacao);
}


export async function getDoacaoAlimento(id) {
  return db.getDoacaoAlimento(id);
}


export async function listDoacoesAlimento() {
  return db.listDoacoesAlimento();
}


export async function listDoacoesAlimentoDetalhado() {
  return db.listDoacoesAlimentoDetalhado();
}


export async function updateDoacaoAlimento(id, doacao) {
  return db.updateDoacaoAlimento(id, doacao);
}


export async function deleteDoacaoAlimento(id) {
  return db.deleteDoacaoAlimento(id);
}