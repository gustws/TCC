import { Router } from 'express';
import * as dbDoacaoDinheiro from '../service/doacaoDinheiroService.js';
import { exigirAdmin } from '../utils/auth.js';   // ← 1) import novo

const endpoints = Router();


endpoints.get('/doacao-dinheiro/detalhado', exigirAdmin, async (req, resp) => {   // ← 2) exigirAdmin
  let doacoes = await dbDoacaoDinheiro.listDoacoesDinheiroDetalhado();
  resp.send(doacoes);
})

endpoints.get('/doacao-dinheiro/:id', exigirAdmin, async (req, resp) => {         // ← 2)
  let id = req.params.id;

  let doacao = await dbDoacaoDinheiro.getDoacaoDinheiro(id);
  resp.send(doacao);
})

endpoints.get('/doacao-dinheiro', exigirAdmin, async (req, resp) => {             // ← 2)
  let doacoes = await dbDoacaoDinheiro.listDoacoesDinheiro();
  resp.send(doacoes);
})

// POST SEM exigirAdmin: é o formulário público de doação, qualquer pessoa precisa conseguir doar
endpoints.post('/doacao-dinheiro', async (req, resp) => {
  let doacao = req.body;

  let id = await dbDoacaoDinheiro.saveDoacaoDinheiro(doacao);
  resp.send({ id });
})

endpoints.put('/doacao-dinheiro/:id', exigirAdmin, async (req, resp) => {         // ← 2)
  let id = req.params.id;
  let doacao = req.body;

  let qtd = await dbDoacaoDinheiro.updateDoacaoDinheiro(id, doacao);
  resp.send({ qtd })
})

endpoints.delete('/doacao-dinheiro/:id', exigirAdmin, async (req, resp) => {      // ← 2)
  let id = req.params.id;

  let qtd = await dbDoacaoDinheiro.deleteDoacaoDinheiro(id);
  resp.send({ qtd })
})


export default endpoints;