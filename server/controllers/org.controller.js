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
  try {
    const org = await Organisation.create({
      name,
      userId,
    });

    res.status(201).json(org);
  } catch (err) {
    if (err.code === 11000) {
      throw new CustomError(400, "Organisation already exists for this admin");
    }
    throw err;
  }
};

export const getQueues = async (req, res) => {
  let userId = req.userId;
  let org = await Organisation.findOne({ userId });
  let affiliatedQueues = await Queue.find({ orgId: org._id });
  console.log("affiliatedQueues:", affiliatedQueues);
  res.status(200).json(affiliatedQueues);
};

export const getMyOrg = async (req, res) => {
  const userId = req.userId;
  if (!userId) throw new CustomError(400, "User Not Found");
  let org = await Organisation.findOne({ userId });
  res.status(200).json({
    organisation: org || null,
  });
};
