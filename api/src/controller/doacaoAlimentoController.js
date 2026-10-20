import { Router } from 'express';
import * as dbDoacaoAlimento from '../service/doacaoAlimentoService.js';

const endpoints = Router();

endpoints.get('/doacao-alimento/detalhado', async (req, resp) => {
  let doacoes = await dbDoacaoAlimento.listDoacoesAlimentoDetalhado();
  resp.send(doacoes);
})

endpoints.get('/doacao-alimento/:id', async (req, resp) => {
  let id = req.params.id;

  let doacao = await dbDoacaoAlimento.getDoacaoAlimento(id);
  resp.send(doacao);
})

endpoints.get('/doacao-alimento', async (req, resp) => {
  let doacoes = await dbDoacaoAlimento.listDoacoesAlimento();
  resp.send(doacoes);
})

endpoints.post('/doacao-alimento', async (req, resp) => {
  let doacao = req.body;

  let id = await dbDoacaoAlimento.saveDoacaoAlimento(doacao);
  resp.send({ id });
})

endpoints.put('/doacao-alimento/:id', async (req, resp) => {
  let id = req.params.id;
  let doacao = req.body;

  let qtd = await dbDoacaoAlimento.updateDoacaoAlimento(id, doacao);
  resp.send({ qtd })
})

endpoints.delete('/doacao-alimento/:id', async (req, resp) => {
  let id = req.params.id;

  let qtd = await dbDoacaoAlimento.deleteDoacaoAlimento(id);
  resp.send({ qtd })
})


export default endpoints;