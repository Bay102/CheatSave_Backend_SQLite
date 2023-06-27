import bcrypt from 'bcrypt';
import { NextFunction, Request, Response } from 'express';
import { prisma } from './app';
import { z } from 'zod';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { User } from '@prisma/client';

dotenv.config();

const saltRounds = 11;

export const encryptPassword = (password: string) => {
  return bcrypt.hash(password, saltRounds);
};

export const createUnsecuredUserData = (user: User) => ({
  username: user.username,
});

export const createTokenForUser = (user: User) => {
  return jwt.sign(createUnsecuredUserData(user), process.env.JWT_SECRET);
};

const jwtInfoSchema = z.object({
  username: z.string(),
  iat: z.number(),
});

export const getDataFromAuthToken = (token?: string) => {
  if (!token) return null;
  try {
    return jwtInfoSchema.parse(jwt.verify(token, process.env.JWT_SECRET));
  } catch (e) {
    console.log(e);
    return null;
  }
};

//| JWT STUFF ///////////////
export const authenticationMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //  console.log(req.headers.authorization);
  const [, token] = req.headers.authorization?.split?.(' ') || []; //! Have Jon Explain

  const userJwtData = getDataFromAuthToken(token);

  if (!userJwtData) {
    return res.status(401).json({ message: 'Invalid Token' });
  }

  const userFromJwt = await prisma.user.findFirst({
    where: {
      username: userJwtData.username,
    },
  });
  if (!userFromJwt) {
    return res.status(404).json({ message: 'User not found' });
  }

  req.user = userFromJwt;
  next();
};
//| JWT STUFF////////////////
