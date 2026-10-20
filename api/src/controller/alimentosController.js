import { Router } from 'express';
import * as dbAlimento from '../service/alimentosService.js';

const endpoints = Router();


endpoints.get('/alimento/:id', async (req, resp) => {
  let id = req.params.id;

  let alimento = await dbAlimento.getAlimento(id);
  resp.send(alimento);
})

endpoints.get('/alimento', async (req, resp) => {
  let alimentos = await dbAlimento.listAlimentos();
  resp.send(alimentos);
})

endpoints.post('/alimento', async (req, resp) => {
  let alimento = req.body;

  let id = await dbAlimento.saveAlimento(alimento);
  resp.send({ id });
})

endpoints.put('/alimento/:id', async (req, resp) => {
  let id = req.params.id;
  let alimento = req.body;

  let qtd = await dbAlimento.updateAlimento(id, alimento);
  resp.send({ qtd })
})

endpoints.delete('/alimento/:id', async (req, resp) => {
  let id = req.params.id;

  let qtd = await dbAlimento.deleteAlimento(id);
  resp.send({ qtd })
})


export default endpoints;