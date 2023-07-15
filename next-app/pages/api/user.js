import nextConnect from 'next-connect';
import bcrypt from 'bcryptjs';
import User from '../../models/User';
import dbConnect from '../../utils/dbConnect';

const handler = nextConnect();

handler.post(async (req, res) => {
  await dbConnect();

  const { name, email, password } = req.body;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return res.status(409).send('User already exists');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  res.status(201).json(user);
});

export default handler;