import * as db from '../repository/alimentosRepository.js';


export async function saveAlimento(alimento) {
  return db.saveAlimento(alimento);
}


export async function getAlimento(id) {
  return db.getAlimento(id);
}


export async function listAlimentos() {
  return db.listAlimentos();
}


export async function updateAlimento(id, alimento) {
  return db.updateAlimento(id, alimento);
}


export async function deleteAlimento(id) {
  return db.deleteAlimento(id);
}