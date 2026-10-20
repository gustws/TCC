import { Router } from 'express';
import * as dbDoacaoDinheiro from '../service/doacaoDinheiroService.js';

const endpoints = Router();


// precisa vir antes de '/doacao-dinheiro/:id'
endpoints.get('/doacao-dinheiro/detalhado', async (req, resp) => {
  let doacoes = await dbDoacaoDinheiro.listDoacoesDinheiroDetalhado();
  resp.send(doacoes);
})

endpoints.get('/doacao-dinheiro/:id', async (req, resp) => {
  let id = req.params.id;

  let doacao = await dbDoacaoDinheiro.getDoacaoDinheiro(id);
  resp.send(doacao);
})

endpoints.get('/doacao-dinheiro', async (req, resp) => {
  let doacoes = await dbDoacaoDinheiro.listDoacoesDinheiro();
  resp.send(doacoes);
})

endpoints.post('/doacao-dinheiro', async (req, resp) => {
  let doacao = req.body;

  let id = await dbDoacaoDinheiro.saveDoacaoDinheiro(doacao);
  resp.send({ id });
})

endpoints.put('/doacao-dinheiro/:id', async (req, resp) => {
  let id = req.params.id;
  let doacao = req.body;

  let qtd = await dbDoacaoDinheiro.updateDoacaoDinheiro(id, doacao);
  resp.send({ qtd })
})

endpoints.delete('/doacao-dinheiro/:id', async (req, resp) => {
  let id = req.params.id;

  let qtd = await dbDoacaoDinheiro.deleteDoacaoDinheiro(id);
  resp.send({ qtd })
})


export default endpoints;