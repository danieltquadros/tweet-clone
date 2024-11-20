import { Router } from 'express';
import { verifyJWT } from '../middlewares/jwt';
import * as feedController from '../controllers/feed';

const feedRouter = Router();

feedRouter.get('/', verifyJWT, feedController.getFeed);

export default feedRouter;
