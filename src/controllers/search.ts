import { Response } from 'express';
import { ExtendedRequest } from '../types/extendedRequest';
import { searchSchema } from '../schemas/searchSchema';
import { findTweetsByBody } from '../services/tweet';

export const searchTweets = async (req: ExtendedRequest, res: Response) => {
  const safeData = searchSchema.safeParse(req.query);
  if (!safeData.success) {
    res.json({ error: safeData.error.flatten().fieldErrors });
    return;
  }

  let currentPage = safeData.data.page ?? 0;
  let perPage = 2;

  const tweets = await findTweetsByBody(safeData.data.q, currentPage, perPage);

  res.json({ tweets, page: currentPage });
};
