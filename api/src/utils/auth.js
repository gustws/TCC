import jwt from 'jsonwebtoken';

export function exigirAdmin(req, resp, next) {
  const [tipo, token] = (req.headers.authorization || '').split(' ');

  if (tipo !== 'Bearer' || !token)
    return resp.status(401).send({ erro: 'Não autenticado.' });

  try {
    const dados = jwt.verify(token, process.env.JWT_SECRET);

    if (!dados.admin)
      return resp.status(403).send({ erro: 'Acesso restrito a administradores.' });

    req.usuario = dados;
    next();
  }
  catch (err) {
    resp.status(401).send({ erro: 'Sessão inválida ou expirada.' });
  }
}