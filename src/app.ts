import express, { Request, Response, NextFunction, Router } from 'express';
import cors from 'cors';
import routes from './routes';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/v1', routes);

app.use((req: Request, res: Response) => {
  res.status(404).json({ error: 'Rota não encontrada' });
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Erro interno no servidor' });
});

module.exports = app;