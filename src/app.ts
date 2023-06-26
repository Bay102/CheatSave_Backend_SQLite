import express from 'express';
// import "express-async-errors";
import { userController } from './routers/user.router';
import { PrismaClient, User } from '@prisma/client';
import { codeController } from './routers/cheatCode.router';
import { consoleController } from './routers/console.router';

const app = express();
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.setHeader('Access-Control-Allow-Headers',  'Authorization ,Content-Type');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
  next();
});

export const prisma = new PrismaClient();

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }

  namespace NodeJS {
    export interface ProcessEnv {
      DATABASE_URL: string;
      JWT_SECRET: string;
    }
  }
}

app.use(userController);
app.use(codeController);
app.use(consoleController);

const port = process.env.NODE_ENV === 'test' ? 3001 : 3000;
app.listen(port, () =>
  console.log(`🚀 Server ready at: http://localhost:${port}`)
);
