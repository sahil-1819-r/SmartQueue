import Organization from '../models/Organization.model.js';
import Queue from '../models/Queue.model.js';

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
