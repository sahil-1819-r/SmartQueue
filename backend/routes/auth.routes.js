import { Router } from 'express';
import { registerUser, registerOrg, login } from '../controllers/authController.js';

const router = Router();

router.post('/register/user', registerUser);
router.post('/register/org', registerOrg);
router.post('/login', login);

export default router;
