import { Router } from 'express';
import * as dbUsuario from '../service/usuariosService.js';
import { exigirAdmin } from '../utils/auth.js';

const endpoints = Router();


endpoints.get('/usuario/:id', exigirAdmin, async (req, resp) => {
  let id = req.params.id;

  let usuario = await dbUsuario.getUsuario(id);
  resp.send(usuario);
})

endpoints.get('/usuario', exigirAdmin, async (req, resp) => {
  let usuarios = await dbUsuario.listUsuarios();
  resp.send(usuarios);
})

endpoints.post('/usuario', exigirAdmin, async (req, resp) => {
  let usuario = req.body;

  let id = await dbUsuario.saveUsuario(usuario);
  resp.send({ id });
})

endpoints.put('/usuario/:id', exigirAdmin, async (req, resp) => {
  let id = req.params.id;
  let usuario = req.body;

  let qtd = await dbUsuario.updateUsuario(id, usuario);
  resp.send({ qtd })
})

endpoints.delete('/usuario/:id', exigirAdmin, async (req, resp) => {
  let id = req.params.id;

  let qtd = await dbUsuario.deleteUsuario(id);
  resp.send({ qtd })
})


export default endpoints;