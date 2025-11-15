import { Router } from 'express';
import { joinQueue, listQueueTokens, markTokenDone } from '../controllers/tokenController.js';
import requireRole from '../middlewares/requireRole.js';

const router = Router();

router.get('/queue/:queueId', listQueueTokens);
router.post('/queue/:queueId/join', joinQueue);
router.patch('/:id/done', requireRole('staff', 'orgOwner'), markTokenDone);

export default router;
