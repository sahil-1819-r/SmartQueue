import { Router } from 'express';
import { getNearbyOrganizations, getOrganization, listQueuesForOrg } from '../controllers/orgController.js';

const router = Router();

router.get('/nearby', getNearbyOrganizations);
router.get('/:id', getOrganization);
router.get('/:id/queues', listQueuesForOrg);

export default router;
