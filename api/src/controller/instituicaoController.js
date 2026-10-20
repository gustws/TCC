import { Router } from 'express';
import * as dbInstituicao from '../service/instituicaoService.js';

const endpoints = Router();


endpoints.get('/instituicao/:id', async (req, resp) => {
  let id = req.params.id;

  let instituicao = await dbInstituicao.getInstituicao(id);
  resp.send(instituicao);
})

endpoints.get('/instituicao', async (req, resp) => {
  let instituicoes = await dbInstituicao.listInstituicoes();
  resp.send(instituicoes);
})

endpoints.post('/instituicao', async (req, resp) => {
  let instituicao = req.body;

  let id = await dbInstituicao.saveInstituicao(instituicao);
  resp.send({ id });
})

endpoints.put('/instituicao/:id', async (req, resp) => {
  let id = req.params.id;
  let instituicao = req.body;

  let qtd = await dbInstituicao.updateInstituicao(id, instituicao);
  resp.send({ qtd })
})

endpoints.delete('/instituicao/:id', async (req, resp) => {
  let id = req.params.id;

  let qtd = await dbInstituicao.deleteInstituicao(id);
  resp.send({ qtd })
})


export default endpoints;