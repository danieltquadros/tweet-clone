import { Response } from 'express';
import { ExtendedRequest } from '../types/extendedRequest';
import { feedSchema } from '../schemas/feed';
import { getUserFollowing } from '../services/user';
import { findTweetFeed } from '../services/tweet';

export const getFeed = async (req: ExtendedRequest, res: Response) => {
  const safeData = feedSchema.safeParse(req.query);
  if (!safeData.success) {
    res.json({ error: safeData.error.flatten().fieldErrors });
    return;
  }

  let currentPage = safeData.data.page ?? 0;
  let perPage = 2;

  const following = await getUserFollowing(req.userSlug as string);
  const tweets = await findTweetFeed(following, currentPage, perPage);

  console.log(tweets);

  res.json({ tweets, page: currentPage });
};
