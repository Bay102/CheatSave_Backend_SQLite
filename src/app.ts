import express from 'express'
// import "express-async-errors";
import { userController } from './routers/user.router';
import { PrismaClient } from "@prisma/client";

const app = express();
app.use(express.json());

export const prisma = new PrismaClient();



app.use(userController);


app.listen(3000)