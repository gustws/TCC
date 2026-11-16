TCC do ISNSF - 2026

Integrantes =>
 - Ana Clara Gualberto
 - Erick Nascimento
 - Guilherme Gomes
 - Gustavo Vaz
 - Lara Quaresma


Antes de rodar o projeto, é necessário instalar o NodeJS e o MySQL Workbench (senha e usuário como root).

    ---> Na API:
        cd api | npm install => node src/api.js
        É necessário criar o .env(Crie o JWT_SECRET e o PORT = 2078) 

    ---> Pra criar admins:
        node src/criarAdmin.js "Nome" email@exemplo.com senha


    ---> No React:
        cd x | npm install => npm start
    