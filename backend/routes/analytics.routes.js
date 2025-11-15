import { Router } from 'express';
import { queueAnalytics, userAnalytics } from '../controllers/analyticsController.js';
import authJWT from '../middlewares/authJWT.js';

const router = Router();

router.get('/queues/:queueId', authJWT, queueAnalytics);
router.get('/me', authJWT, userAnalytics);

export default router;
