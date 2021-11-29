import 'express-async-errors';
import express from 'express';
import cors from 'cors';
import { router } from './routes';
import { Request, Response, NextFunction } from 'express';
import { AppError } from './errors/AppError';

const app = express();

app.use(express.json());

app.use(cors())

app.use(router);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if(err instanceof AppError) {
    return res.status(err.statusCode).json({
      message: err.message
    });
  }

  return res.status(500).json({
    message: 'Erro interno do servidor!'
  });
})

app.listen(3333, () => console.log('Server is running on port 3333'));