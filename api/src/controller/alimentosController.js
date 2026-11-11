import { Router } from 'express';
import * as dbAlimento from '../service/alimentosService.js';
import { exigirAdmin } from '../utils/auth.js';

const endpoints = Router();


// GETs públicos: o formulário de doação lista os alimentos
endpoints.get('/alimento/:id', async (req, resp) => {
  let id = req.params.id;

  let alimento = await dbAlimento.getAlimento(id);
  resp.send(alimento);
})

endpoints.get('/alimento', async (req, resp) => {
  let alimentos = await dbAlimento.listAlimentos();
  resp.send(alimentos);
})

endpoints.post('/alimento', exigirAdmin, async (req, resp) => {
  let alimento = req.body;

  let id = await dbAlimento.saveAlimento(alimento);
  resp.send({ id });
})

endpoints.put('/alimento/:id', exigirAdmin, async (req, resp) => {
  let id = req.params.id;
  let alimento = req.body;

  let qtd = await dbAlimento.updateAlimento(id, alimento);
  resp.send({ qtd })
})

endpoints.delete('/alimento/:id', exigirAdmin, async (req, resp) => {
  let id = req.params.id;

  let qtd = await dbAlimento.deleteAlimento(id);
  resp.send({ qtd })
})


export default endpoints;