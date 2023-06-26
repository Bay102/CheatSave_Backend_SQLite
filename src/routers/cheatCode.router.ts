import { NextFunction, Request, Response, Router } from 'express';
import { prisma } from '../app';
import { z } from 'zod';
import { validateRequest } from 'zod-express-middleware';
import { authenticationMiddleware } from '../auth-utils';
import { intParseableString as intParsableString } from '../../zod/intParseString.schema';

const codeController = Router();

//| Get Users Cheat Codes
codeController.get('/codes/:id', async (req, res) => {
  const usersCodes = await prisma.cheatCode.findMany({
    where: {
      userId: +req.params.id,
    },
    include: {
      user: true,
      console: true,
    },
  });

  if (!usersCodes) {
    return res.status(500).json({ message: 'No Codes' });
  }

  res.status(200).send(usersCodes);
});

//| User Create New CheatCode
codeController.post(
  '/user/newcode',
  authenticationMiddleware,
  validateRequest({
    body: z.object({
      userId: z.number(),
      consoleName: z.string(),
      gameTitle: z.string(),
      codeTitle: z.string(),
      code: z.string(),
    }),
  }),
  async (req, res) => {
    const { userId, gameTitle, codeTitle, code, consoleName } = req.body;
    console.log(userId);

    try {
      const newCode = await prisma.cheatCode.create({
        data: {
          userId,
          consoleName, 
          gameTitle,
          codeTitle,
          code,
        },
      });
      res.status(200).json(newCode);
    } catch (error) {
      console.error(error);
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
      return res.status(500).json({ message: 'missing code-id' }); //! ask Jon how to get this error to show
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
