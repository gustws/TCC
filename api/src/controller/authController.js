import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import * as dbUsuario from '../service/usuariosService.js';

const endpoints = Router();


endpoints.post('/login', async (req, resp) => {
  const { email, senha } = req.body;

  if (!email || !senha)
    return resp.status(400).send({ erro: 'Informe e-mail e senha.' });

  const usuario = await dbUsuario.getUsuarioPorEmail(email);
  const senhaOk = usuario && await bcrypt.compare(senha, usuario.senha);

  if (!senhaOk)
    return resp.status(401).send({ erro: 'E-mail ou senha incorretos.' });

  if (!usuario.admin)
    return resp.status(403).send({ erro: 'Acesso restrito a administradores.' });

  const token = jwt.sign(
    { id: usuario.id, admin: true },
    process.env.JWT_SECRET,
    { expiresIn: '8h' }
  );

  resp.send({ token, nome: usuario.nome });
})


export default endpoints;