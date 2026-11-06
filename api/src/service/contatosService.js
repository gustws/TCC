import * as db from '../repository/contatosRepository.js';


export async function saveContato(contato) {
  return db.saveContato(contato);
}


export async function getContato(id) {
  return db.getContato(id);
}


export async function listContatos() {
  return db.listContatos();
}


export async function updateContato(id, contato) {
  return db.updateContato(id, contato);
}


export async function deleteContato(id) {
  return db.deleteContato(id);
}
