import { NextFunction, Request, Response, Router } from 'express';
import { prisma } from '../app';
import { z } from 'zod';
import { validateRequest } from 'zod-express-middleware';
import { authenticationMiddleware } from '../auth-utils';

const codeController = Router();



//| User Create New CheatCode
codeController.post(
  '/user/newcode',
  authenticationMiddleware,
  validateRequest({
    body: z.object({
      gameTitle: z.string(),
      codeTitle: z.string(),
      code: z.string(),
      gameConsole: z.string(),
      userId: z.number(),
      consoleId: z.number()
    }),
  }),
  async (req, res) => {
    const { gameTitle, codeTitle, code, gameConsole, consoleId } = req.body;
    try {
      const newCode = await prisma.cheatCode.create({
        data: {
          gameTitle,
          codeTitle,
          code,
          // gameConsole,
          userId: +req.user!.id,
          consoleId
        },
      });
      res.status(200).json(newCode);
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }
);

export { codeController };
