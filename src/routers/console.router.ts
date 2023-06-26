import { Router } from "express";
import { prisma } from "../app";

const consoleController = Router();

//| Get Consoles
consoleController.get('/consoles', async (_req, res) => {
   const consoles = await prisma.console.findMany();
   return res.send(consoles)
})

export {consoleController}