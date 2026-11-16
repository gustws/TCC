import { Router } from 'express';
import * as dbDoacaoDinheiro from '../service/doacaoDinheiroService.js';
import { exigirAdmin } from '../utils/auth.js';

const endpoints = Router();


endpoints.get('/doacao-dinheiro/detalhado', exigirAdmin, async (req, resp) => {
  let doacoes = await dbDoacaoDinheiro.listDoacoesDinheiroDetalhado();
  resp.send(doacoes);
})

endpoints.get('/doacao-dinheiro/:id', exigirAdmin, async (req, resp) => {
  let id = req.params.id;

  let doacao = await dbDoacaoDinheiro.getDoacaoDinheiro(id);
  resp.send(doacao);
})

endpoints.put('/doacao-dinheiro/:id/verificar', exigirAdmin, async (req, resp) => {
  let qtd = await dbDoacaoDinheiro.verificarDoacaoDinheiro(req.params.id);

  if (!qtd)
    return resp.status(409).send({ erro: 'Doação não encontrada ou já verificada.' });

  resp.send({ qtd });
})

endpoints.get('/doacao-dinheiro', exigirAdmin, async (req, resp) => {
  let doacoes = await dbDoacaoDinheiro.listDoacoesDinheiro();
  resp.send(doacoes);
})

// POST SEM exigirAdmin: é o formulário público de doação, qualquer pessoa precisa conseguir doar
endpoints.post('/doacao-dinheiro', async (req, resp) => {
  let doacao = req.body;

  if (!Number.isInteger(doacao.valor) || doacao.valor <= 0)
    return resp.status(400).send({ erro: 'Informe um valor inteiro maior que zero.' });

  let id = await dbDoacaoDinheiro.saveDoacaoDinheiro(doacao);
  resp.send({ id });
})

endpoints.put('/doacao-dinheiro/:id', exigirAdmin, async (req, resp) => {
  let id = req.params.id;
  let doacao = req.body;

  if (!Number.isInteger(doacao.valor) || doacao.valor <= 0)
    return resp.status(400).send({ erro: 'Informe um valor inteiro maior que zero.' });

  let qtd = await dbDoacaoDinheiro.updateDoacaoDinheiro(id, doacao);
  resp.send({ qtd })
})

endpoints.delete('/doacao-dinheiro/:id', exigirAdmin, async (req, resp) => {
  let id = req.params.id;

  let qtd = await dbDoacaoDinheiro.deleteDoacaoDinheiro(id);
  resp.send({ qtd })
})


export default endpoints;