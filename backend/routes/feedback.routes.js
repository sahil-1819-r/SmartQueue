import { Router } from 'express';
import { createFeedback, listFeedback } from '../controllers/feedbackController.js';

const router = Router();

router.get('/queue/:queueId', listFeedback);
router.post('/', createFeedback);

export default router;
