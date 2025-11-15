import { Router } from 'express';
import { queueAnalytics, userAnalytics } from '../controllers/analyticsController.js';

const router = Router();

router.get('/queues/:queueId', queueAnalytics);
router.get('/me', userAnalytics);

export default router;
