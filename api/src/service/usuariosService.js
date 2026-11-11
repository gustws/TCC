import bcrypt from 'bcryptjs';
import * as db from '../repository/usuariosRepository.js';


export async function saveUsuario(usuario) {
  const senha = await bcrypt.hash(usuario.senha, 10);
  return db.saveUsuario({ ...usuario, senha });
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
  const senha = await bcrypt.hash(usuario.senha, 10);
  return db.updateUsuario(id, { ...usuario, senha });
}


export async function deleteUsuario(id) {
  return db.deleteUsuario(id);
}