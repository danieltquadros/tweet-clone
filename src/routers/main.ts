import { Router } from 'express';
import pingRouter from './ping';
import authRouter from './auth';
import tweetRouter from './tweet';
import userRouter from './user';
import feedRouter from './feed';
import searchRouter from './search';
import trendingRouter from './trending';
import suggestionsRouter from './suggestions';

export const mainRouter = Router();

mainRouter.use('/ping', pingRouter);
mainRouter.use('/auth', authRouter);
mainRouter.use('/tweet', tweetRouter);
mainRouter.use('/user', userRouter);
mainRouter.use('/feed', feedRouter);
mainRouter.use('/search', searchRouter);
mainRouter.use('/trending', trendingRouter);
mainRouter.use('/suggestions', suggestionsRouter);
