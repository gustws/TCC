import 'dotenv/config';
import bcrypt from 'bcryptjs';
import { con } from './repository/connection.js';

const [nome, email, senha] = process.argv.slice(2);

if (!nome || !email || !senha) {
  console.log('Uso: node src/criarAdmin.js "Nome" email@exemplo.com senha');
  process.exit(1);
}

const hash = await bcrypt.hash(senha, 10);
await con.query(
  'insert into usuarios (nome, email, senha, admin) values (?, ?, ?, true)',
  [nome, email, hash]
);

console.log('Admin criado!');
process.exit(0);