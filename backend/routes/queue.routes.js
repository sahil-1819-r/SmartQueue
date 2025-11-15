import { Router } from 'express';
import { createQueue, getQueue, listQueues, updateQueue } from '../controllers/queueController.js';
import authJWT from '../middlewares/authJWT.js';
import requireRole from '../middlewares/requireRole.js';

const router = Router();

router.get('/', listQueues);
router.get('/:id', getQueue);
router.post('/', authJWT, requireRole('orgOwner'), createQueue);
router.put('/:id', authJWT, requireRole('orgOwner', 'staff'), updateQueue);

export default router;
