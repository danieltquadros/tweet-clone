import { Response } from 'express';
import { getTrending } from '../services/trend';
import { ExtendedRequest } from '../types/extendedRequest';

export const getTrends = async (req: ExtendedRequest, res: Response) => {
  const trends = await getTrending();

  res.json({ trends });
};
