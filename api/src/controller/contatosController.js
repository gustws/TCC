import { Router } from 'express';
import * as dbContato from '../service/contatosService.js';

const endpoints = Router();


endpoints.get('/contato/:id', async (req, resp) => {
  let id = req.params.id;

  let contato = await dbContato.getContato(id);
  resp.send(contato);
})

endpoints.get('/contato', async (req, resp) => {
  let contatos = await dbContato.listContatos();
  resp.send(contatos);
})

endpoints.post('/contato', async (req, resp) => {
  let contato = req.body;

  let id = await dbContato.saveContato(contato);
  resp.send({ id });
})

endpoints.put('/contato/:id', async (req, resp) => {
  let id = req.params.id;
  let contato = req.body;

  let qtd = await dbContato.updateContato(id, contato);
  resp.send({ qtd })
})

endpoints.delete('/contato/:id', async (req, resp) => {
  let id = req.params.id;

  let qtd = await dbContato.deleteContato(id);
  resp.send({ qtd })
})


export default endpoints;
