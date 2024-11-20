import express from 'express';
import * as pingController from '../controllers/ping';
import { verifyJWT } from '../middlewares/jwt';

const pingRouter = express.Router();

pingRouter.get('/', pingController.ping);
pingRouter.get('/private', verifyJWT, pingController.privatePing);

export default pingRouter;
