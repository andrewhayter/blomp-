import { getSession } from 'next-auth/client';
import dbConnect from '../../utils/dbConnect';
import Link from '../../models/Link';

export default async function handler(req, res) {
  const { method } = req;
  const session = await getSession({ req });

  if (!session) {
    res.status(401).send('Unauthorized');
    return;
  }

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const links = await Link.find({ userId: session.user.id });
        res.status(200).json({ success: true, data: links });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case 'POST':
      try {
        const link = await Link.create({ ...req.body, userId: session.user.id });
        res.status(201).json({ success: true, data: link });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case 'PUT':
      try {
        const link = await Link.findByIdAndUpdate(req.body.id, req.body, {
          new: true,
          runValidators: true,
        });
        if (!link) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: link });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case 'DELETE':
      try {
        const deletedLink = await Link.deleteOne({ _id: req.body.id });
        if (!deletedLink) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: {} });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}