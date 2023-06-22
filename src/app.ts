import express from 'express'
import "express-async-errors";
import { userController } from './routers/user.router';

const app = express();
app.use(express.json());

app.use(userController);


app.listen(3000)