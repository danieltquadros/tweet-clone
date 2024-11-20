import { Router } from 'express';
import * as suggestionsController from '../controllers/suggestions';
import { verifyJWT } from '../middlewares/jwt';

const suggestionsRouter = Router();

suggestionsRouter.get('/', verifyJWT, suggestionsController.getSuggestions);

export default suggestionsRouter;
