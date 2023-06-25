import { NextFunction, Request, Response, Router } from 'express';
import { prisma } from '../app';
import { z } from 'zod';
import { validateRequest } from 'zod-express-middleware';
import { authenticationMiddleware } from '../auth-utils';
import { intParseableString as intParsableString } from '../../zod/intParseString.schema';

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
      userId: z.number(),
      consoleId: z.number(),
    }),
  }),
  async (req, res) => {
    const { gameTitle, codeTitle, code, consoleId } = req.body;
    try {
      const newCode = await prisma.cheatCode.create({
        data: {
          gameTitle,
          codeTitle,
          code,
          userId: +req.user!.id,
          consoleId,
        },
      });
      res.status(200).json(newCode);
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }
);

//| User Delete cheatCode
codeController.delete(
  '/:codeId/delete',
  validateRequest({
    params: z.object({
      codeId: intParsableString,
    }),
  }),
  async (req, res) => {
    if (!req.params.codeId) {
      return res.status(500).json({message: 'missing code-id'})  //! ask Jon how to get this error to show
    }
    await prisma.cheatCode
      .delete({
        where: {
          id: parseInt(req.params.codeId),
        },
      })
      .then(() => res.status(201).json({ message: 'code deleted' }))
      .catch(() => res.status(500).json({ message: 'code not deleted' }));
  }
);

export { codeController };
