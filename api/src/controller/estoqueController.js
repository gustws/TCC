import { Router } from 'express';
import * as dbEstoque from '../service/estoqueService.js';
import { exigirAdmin } from '../utils/auth.js';


const endpoints = Router();


// precisa vir antes de '/estoque/:id'
endpoints.get('/estoque/detalhado', exigirAdmin, async (req, resp) => {
  let estoques = await dbEstoque.listEstoqueComAlimento();
  resp.send(estoques);
})

endpoints.get('/estoque/:id', exigirAdmin, async (req, resp) => {
  let id = req.params.id;

  let estoque = await dbEstoque.getEstoque(id);
  resp.send(estoque);
})

endpoints.get('/estoque', exigirAdmin, async (req, resp) => {
  let estoques = await dbEstoque.listEstoque();
  resp.send(estoques);
})

endpoints.post('/estoque', exigirAdmin, async (req, resp) => {
  let estoque = req.body;

  let id = await dbEstoque.saveEstoque(estoque);
  resp.send({ id });
})

endpoints.put('/estoque/:id', exigirAdmin, async (req, resp) => {
  let id = req.params.id;
  let estoque = req.body;

  let qtd = await dbEstoque.updateEstoque(id, estoque);
  resp.send({ qtd })
})

endpoints.delete('/estoque/:id', exigirAdmin, async (req, resp) => {
  let id = req.params.id;

  let qtd = await dbEstoque.deleteEstoque(id);
  resp.send({ qtd })
})


export default endpoints;