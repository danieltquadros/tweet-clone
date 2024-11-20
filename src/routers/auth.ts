import { Router } from 'express';
import * as authController from '../controllers/auth';

const authRouter = Router();

authRouter.post('/sign-up', authController.signUp);
authRouter.post('/sign-in', authController.signIn);

export default authRouter;
