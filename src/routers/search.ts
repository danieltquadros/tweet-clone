import { Router } from 'express';
import { verifyJWT } from '../middlewares/jwt';
import * as searchController from '../controllers/search';

const searchRouter = Router();

searchRouter.get('/', verifyJWT, searchController.searchTweets);

export default searchRouter;
