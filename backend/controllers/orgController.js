import Organization from '../models/Organization.model.js';
import Queue from '../models/Queue.model.js';
import { log } from '../utils/logger.js';

export const getNearbyOrganizations = async (req, res, next) => {
  try {
    const { lat, lng, radius = 5000 } = req.query;
    const orgs = await Organization.aggregate([
      {
        $geoNear: {
          near: { type: 'Point', coordinates: [parseFloat(lng), parseFloat(lat)] },
          distanceField: 'distance',
          spherical: true,
          maxDistance: Number(radius),
        },
      },
      { $limit: 20 },
    ]);
    log('GEO', `Found ${orgs.length} nearby orgs for query lat=${lat}, lng=${lng}`);
    res.json(orgs);
  } catch (error) {
    next(error);
  }
};

export const getOrganization = async (req, res, next) => {
  try {
    const organization = await Organization.findById(req.params.id).populate('queues.queue');
    res.json(organization);
  } catch (error) {
    next(error);
  }
};

export const listQueuesForOrg = async (req, res, next) => {
  try {
    const queues = await Queue.find({ organization: req.params.id });
    res.json(queues);
  } catch (error) {
    next(error);
  }
};
