import { Router } from 'express';
import { createFeedback, listFeedback } from '../controllers/feedbackController.js';
import authJWT from '../middlewares/authJWT.js';

const router = Router();

router.get('/queue/:queueId', listFeedback);
router.post('/', authJWT, createFeedback);

export default router;
