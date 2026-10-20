import * as db from '../repository/instituicaoRepository.js';


export async function saveInstituicao(instituicao) {
  return db.saveInstituicao(instituicao);
}


export async function getInstituicao(id) {
  return db.getInstituicao(id);
}


export async function listInstituicoes() {
  return db.listInstituicoes();
}


export async function updateInstituicao(id, instituicao) {
  return db.updateInstituicao(id, instituicao);
}


export async function deleteInstituicao(id) {
  return db.deleteInstituicao(id);
}