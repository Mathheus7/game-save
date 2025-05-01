import AppDataSource from "./database/data-source";

const app = require('./app');
const dotenv = require('dotenv');

dotenv.config();

const PORT = process.env.PORT || 8080;

AppDataSource.initialize()
    .then(() => {
      console.log('Conexão com o banco de dados estabelecida com sucesso!');
    })
    .catch((error) => {
      console.error('Erro ao conectar com o banco de dados:', error);
    });

app.listen(PORT, () => {
  console.log('Servidor rodando na porta', PORT);
});