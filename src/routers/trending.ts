import { Router } from 'express';
import { verifyJWT } from '../middlewares/jwt';
import * as trendingController from '../controllers/trending';

const trendingRouter = Router();

trendingRouter.get('/', verifyJWT, trendingController.getTrends);

export default trendingRouter;
