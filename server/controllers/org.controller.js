import Organisation from "../models/organisation.js";
import { CustomError } from "../middlewares/CustomError.js";
import Queue from "../models/queue.js";

export const createOrg = async (req, res) => {
  let { name } = req.body;
  if (!name) {
    throw new CustomError(400, "Missing fields");
  }
  const userId = req.userId;
  if (!userId) {
    throw new CustomError(400, "User Not Found");
  }

  let response = await Organisation.create({
    name: name,
    userId: userId,
  });
  console.log(response);
  res.status(201).json({ response });
};

export const getQueues = async (req, res) => {
  let userId = req.userId;
  let org = await Organisation.findOne(userId);
  let affiliatedQueues = await Queue.find(org._id);
  res.status(200).json(affiliatedQueues);
};

export const getAllOrgs = async (req, res) => {
  const userId = req.userId;
  if (!userId) throw new CustomError(400, "User Not Found");
  let orgs = Organisation.find(userId);
  res.status(200).json(orgs);
};
