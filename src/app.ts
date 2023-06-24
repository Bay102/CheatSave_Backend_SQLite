import express from 'express'
// import "express-async-errors";
import { userController } from './routers/user.router';
import { PrismaClient, User } from "@prisma/client";

const app = express();
app.use(express.json());
export const prisma = new PrismaClient();


declare global {     //! Have Jon explain 
   namespace Express {
     interface Request {
       user?: User;
     }
   }
 
   namespace NodeJS {
     export interface ProcessEnv {
       DATABASE_URL: string;
       JWT_SECRET: string
     }
   }
}

app.use(userController);




app.listen(3000);