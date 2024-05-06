import dbConnect from '@/db/dbConnect';
import ShortLink from '@/db/models/ShortLink';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();
  const { id } = req.query;

  switch(req.method) {
    case 'GET':
      const shortLink = await ShortLink.findById(id);
      res.status(200).send(shortLink);
      break;

    case 'PATCH':
      const updateShortLink = await ShortLink.findByIdAndUpdate(id, req.body, {
        new: true
      });
      res.status(200).send(updateShortLink);
      break;
    
    case 'DELETE': 
      await ShortLink.findByIdAndDelete(id);
      res.status(204).send(null);
      break;
      
    default:
      res.status(404).send(null);
      break;
  }
}
