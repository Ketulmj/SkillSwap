import { Router } from 'express';
import { login, signup } from '../controllers/auth.controller.js';

const authRouter = Router();
// api/auth/signup
authRouter.post('/signup', signup);

// api/auth/login
authRouter.post('/login', login);

export default authRouter;