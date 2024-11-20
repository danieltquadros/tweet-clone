import { Prisma } from '@prisma/client';
import { prisma } from '../utils/prisma';
import { getPublicURL } from '../utils/url';

export const findUserByEmail = async (email: string) => {
  const user = await prisma.user.findFirst({
    where: { email },
  });

  if (user) {
    return {
      ...user,
      avatar: getPublicURL(user.avatar),
      cover: getPublicURL(user.cover),
    };
  }

  return null;
};

export const findUserBySlug = async (slug: string) => {
  const user = await prisma.user.findFirst({
    select: {
      avatar: true,
      cover: true,
      slug: true,
      name: true,
      bio: true,
      link: true,
    },
    where: { slug },
  });

  if (user) {
    return {
      ...user,
      avatar: getPublicURL(user.avatar),
      cover: getPublicURL(user.cover),
    };
  }

  return null;
};

export const createUser = async (data: Prisma.UserCreateInput) => {
  const newUser = await prisma.user.create({ data });

  return {
    ...newUser,
    avatar: getPublicURL(newUser.avatar),
    cover: getPublicURL(newUser.cover),
  };
};

export const getUserFollowingCount = async (slug: string) => {
  const count = await prisma.follow.count({
    where: { userOneSlug: slug },
  });

  return count;
};

export const getUserFollowersCount = async (slug: string) => {
  const count = await prisma.follow.count({
    where: { userTwoSlug: slug },
  });

  return count;
};

export const getUserTweetCount = async (slug: string) => {
  const count = await prisma.tweet.count({
    where: { userSlug: slug },
  });

  return count;
};

export const checkIfFollows = async (
  userOneSlug: string,
  userTwoSlug: string,
) => {
  const follows = await prisma.follow.findFirst({
    where: { userOneSlug, userTwoSlug },
  });

  return !!follows;
};

export const follow = async (userOneSlug: string, userTwoSlug: string) => {
  await prisma.follow.create({
    data: { userOneSlug, userTwoSlug },
  });
};

export const unFollow = async (userOneSlug: string, userTwoSlug: string) => {
  await prisma.follow.deleteMany({
    where: { userOneSlug, userTwoSlug },
  });
};

export const updateUserInfo = async (
  slug: string,
  data: Prisma.UserUpdateInput,
) => {
  await prisma.user.update({
    where: { slug },
    data,
  });
};

export const getUserFollowing = async (slug: string) => {
  const following = [];
  const reqFollow = await prisma.follow.findMany({
    select: { userTwoSlug: true },
    where: { userOneSlug: slug },
  });

  for (let reqItem of reqFollow) {
    following.push(reqItem.userTwoSlug);
  }

  return following;
};

export const getUserSuggestions = async (slug: string) => {
  const following = await getUserFollowing(slug);

  const followingPlusMe = [...following, slug];

  type Suggestion = Pick<
    Prisma.UserGetPayload<Prisma.UserDefaultArgs>,
    'name' | 'avatar' | 'slug'
  >;

  const suggestions: Suggestion[] = await prisma.$queryRaw`
    SELECT
      name, avatar, slug
    FROM "User"
    WHERE
      slug NOT IN (${followingPlusMe.join(',')})
    ORDER BY RANDOM()
    LIMIT 2;
  `;

  for (let sugIndex in suggestions) {
    suggestions[sugIndex].avatar = getPublicURL(suggestions[sugIndex].avatar);
  }

  return suggestions;
};
