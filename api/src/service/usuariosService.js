import * as db from '../repository/usuariosRepository.js';


export async function saveUsuario(usuario) {
  return db.saveUsuario(usuario);
}


export async function getUsuario(id) {
  return db.getUsuario(id);
}


export async function getUsuarioPorEmail(email) {
  return db.getUsuarioPorEmail(email);
}


export async function listUsuarios() {
  return db.listUsuarios();
}


export async function updateUsuario(id, usuario) {
  return db.updateUsuario(id, usuario);
}


export async function deleteUsuario(id) {
  return db.deleteUsuario(id);
}