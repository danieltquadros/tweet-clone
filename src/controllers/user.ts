import { Response } from 'express';
import { ExtendedRequest } from '../types/extendedRequest';
import {
  checkIfFollows,
  findUserBySlug,
  follow,
  getUserFollowersCount,
  getUserFollowingCount,
  getUserTweetCount,
  unFollow,
  updateUserInfo,
} from '../services/user';
import { userTweetsSchema } from '../schemas/userTweets';
import { findTweetsByUser } from '../services/tweet';
import { updateUserSchema } from '../schemas/updateUser';

export const getUser = async (req: ExtendedRequest, res: Response) => {
  const { slug } = req.params;

  const user = await findUserBySlug(slug);

  if (!user) {
    res.json({ error: 'user not found' });
    return;
  }

  const followingCount = await getUserFollowingCount(user.slug);
  const followersCount = await getUserFollowersCount(user.slug);
  const tweetCount = await getUserTweetCount(user.slug);

  res.json({ user, followingCount, followersCount, tweetCount });
};

export const getUserTweets = async (req: ExtendedRequest, res: Response) => {
  const { slug } = req.params;
  // const { page } = req.query;

  const safeData = userTweetsSchema.safeParse(req.query);
  if (!safeData.success) {
    res.json({ error: safeData.error.flatten().fieldErrors });
    return;
  }

  let perPage = 2;
  let currentPage = safeData.data.page ?? 0;

  const tweets = await findTweetsByUser(slug, currentPage, perPage);

  res.json({ tweets, page: currentPage });
};

export const toggleFollow = async (req: ExtendedRequest, res: Response) => {
  const { slug } = req.params;

  const me = req.userSlug as string;

  const hasUserToBeFollowed = await findUserBySlug(slug);
  if (!hasUserToBeFollowed) {
    res.json({ error: 'user not found' });
    return;
  }

  const follows = await checkIfFollows(me, slug);
  if (!follows) {
    await follow(me, slug);
    res.json({ following: true });
  } else {
    await unFollow(me, slug);
    res.json({ following: false });
  }
};

export const updateUser = async (req: ExtendedRequest, res: Response) => {
  const safeData = updateUserSchema.safeParse(req.body);
  if (!safeData.success) {
    res.json({ error: safeData.error.flatten().fieldErrors });
    return;
  }

  await updateUserInfo(req.userSlug as string, safeData.data);

  res.json({});
};
