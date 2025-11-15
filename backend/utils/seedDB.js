import connectDB from '../config/db.js';
import Organization from '../models/Organization.model.js';

const seed = async () => {
  await connectDB();
  await Organization.deleteMany();
  await Organization.create({
    name: 'Demo Org',
    description: 'Sample organization',
  });
  console.log('Seed completed');
  process.exit();
};

seed();
