import { Router } from 'express';
import * as dbDoacaoAlimento from '../service/doacaoAlimentoService.js';
import { exigirAdmin } from '../utils/auth.js';

const endpoints = Router();


// precisa vir antes de '/doacao-alimento/:id'
endpoints.get('/doacao-alimento/detalhado', exigirAdmin, async (req, resp) => {
  let doacoes = await dbDoacaoAlimento.listDoacoesAlimentoDetalhado();
  resp.send(doacoes);
})

endpoints.get('/doacao-alimento/:id', exigirAdmin, async (req, resp) => {
  let id = req.params.id;

  let doacao = await dbDoacaoAlimento.getDoacaoAlimento(id);
  resp.send(doacao);
})

endpoints.get('/doacao-alimento', exigirAdmin, async (req, resp) => {
  let doacoes = await dbDoacaoAlimento.listDoacoesAlimento();
  resp.send(doacoes);
})

// público: é o formulário de doação do site
endpoints.post('/doacao-alimento', async (req, resp) => {
  let doacao = req.body;

  let id = await dbDoacaoAlimento.saveDoacaoAlimento(doacao);
  resp.send({ id });
})

endpoints.put('/doacao-alimento/:id', exigirAdmin, async (req, resp) => {
  let id = req.params.id;
  let doacao = req.body;

  let qtd = await dbDoacaoAlimento.updateDoacaoAlimento(id, doacao);
  resp.send({ qtd })
})

endpoints.delete('/doacao-alimento/:id', exigirAdmin, async (req, resp) => {
  let id = req.params.id;

  let qtd = await dbDoacaoAlimento.deleteDoacaoAlimento(id);
  resp.send({ qtd })
})


export default endpoints;