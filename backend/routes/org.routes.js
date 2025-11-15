import { Router } from 'express';
import { getOrganization, listQueuesForOrg } from '../controllers/orgController.js';

const router = Router();

router.get('/:id', getOrganization);
router.get('/:id/queues', listQueuesForOrg);

export default router;
