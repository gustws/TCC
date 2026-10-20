import usuarios from './controller/usuariosController.js'
import instituicao from './controller/instituicaoController.js'
import alimentos from './controller/alimentosController.js'
import estoque from './controller/estoqueController.js'
import doacaoAlimento from './controller/doacaoAlimentoController.js'
import doacaoDinheiro from './controller/doacaoDinheiroController.js'


export function addRoutes(api) {
  api.use(usuarios);
  api.use(instituicao);
  api.use(alimentos);
  api.use(estoque);
  api.use(doacaoAlimento);
  api.use(doacaoDinheiro);
}