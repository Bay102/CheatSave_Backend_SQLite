import { NextFunction, Request, Response, Router } from 'express';
import { prisma } from '../app';
import {
  authenticationMiddleware,
  createTokenForUser,
  createUnsecuredUserData,
  encryptPassword,
} from '../auth-utils';
import { z } from 'zod';
import { validateRequest } from 'zod-express-middleware';
import bcrypt from 'bcrypt';

const userController = Router();

//| Get Users
userController.get('/users', async (_req, res) => {
  const users = await prisma.user.findMany()
  res.send(users)
})


//|   Create New User
userController.post(
  '/user/create',
  validateRequest({
    body: z.object({
      username: z.string(),
      passwordHash: z.string(),
    }),
  }),
  async (req, res) => {
    try {
      const usernameTaken = await prisma.user.findUnique({
        where: {
          username: req.body.username,
        },
      });

      if (usernameTaken) {
        return res.status(404).json({ message: 'Username Taken' });
      }

      const user = await prisma.user.create({
        data: {
          username: req.body.username,
          passwordHash: await encryptPassword(req.body.passwordHash),
        },
      });

      res.status(201).send(user);
    } catch (error) {
      console.error(error);
      res.status(404).json({ message: error });
    }
  }
);

//| Login
userController.post(
  '/user/login',
  validateRequest({
    body: z.object({
      username: z.string(),
      password: z.string(),
    }),
  }),
  async (req, res) => {
    try {
      const user = await prisma.user.findFirst({
        where: {
          username: req.body.username,
        },
      });

      if (!user) {
        return res.status(404).json({ message: 'username does not exist' });
      }

      const isPasswordCorrect = await bcrypt.compare(
        req.body.password,
        user.passwordHash
      );

      if (!isPasswordCorrect) {
        return res.status(401).json({ message: 'Incorrect Password' });
      }

      const userInformation = createUnsecuredUserData(user);
      const token = createTokenForUser(user);

      res.status(200).json({ token, userInformation });
    } catch (error) {
      console.error(error);
      res.status(404).json({ error });
    }
  }
);

//| Update User Email
userController.patch(
  '/user/update',
  authenticationMiddleware,
  validateRequest({
    body: z.object({
      username: z.string(),
    }),
  }),
  async (req: Request, res: Response, next: NextFunction) => {
    
    console.log(req.user!.username);

    if (req.user!.username === req.body.username) {
      return res.status(400).json({
        message:
          'Please change your username to something different than your current one',
      });
    }
    return await prisma.user
      .update({
        where: {
          username: req.user!.username,
        },
        data: {
          username: req.body.username,
        },
      })
      .then((user) => res.status(201).json(user))
      .catch((e) => {
        console.error(e);
        res.status(500).json({ message: 'Username is taken' });
      })
      .finally(next);
  }
);

export { userController };
