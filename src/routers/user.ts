import { Router } from 'express';
import { verifyJWT } from '../middlewares/jwt';
import * as userController from '../controllers/user';

const userRouter = Router();

userRouter.get('/:slug', verifyJWT, userController.getUser);
userRouter.get('/:slug/tweets', verifyJWT, userController.getUserTweets);
userRouter.post('/:slug/follow', verifyJWT, userController.toggleFollow);
userRouter.put('/', verifyJWT, userController.updateUser);
userRouter.put('/avatar');
userRouter.put('/cover');

export default userRouter;
