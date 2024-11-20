import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { findUserBySlug } from '../services/user';
import { ExtendedRequest } from '../types/extendedRequest';

export const verifyJWT = async (
  req: ExtendedRequest,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    res.status(401).json({ error: 'access denied' });
    return;
  }

  const token = authHeader.split(' ')[1];

  jwt.verify(
    token,
    process.env.JWT_SECRET as string,
    async (error, decoded: any) => {
      if (error) {
        res.status(401).json({ error: 'access denied' });
        return;
      }

      const user = await findUserBySlug(decoded.slug);
      if (!user) {
        res.status(401).json({ error: 'access denied' });
        return;
      }

      req.userSlug = user.slug;
      next();
    },
  );
};
