import dbConnect from '@/db/dbConnect';
import QRCode from '@/db/models/QRCode';

export default async function handler(req, res) {
  await dbConnect();
  const { id } = req.query;

  switch (req.method) {
    case 'GET':
      const qrcode = await QRCode.findById(id);
      res.send(qrcode);
      break;

    case 'PATCH':
      const updatedQRCode = await QRCode.findByIdAndUpdate(id, req.body, { new: true });
      res.send(updatedQRCode);
      break;

    case 'DELETE':
      await QRCode.findByIdAndDelete(id);
      res.status(204).send();
      break;

    default:
      res.status(404).send();
      break;
  }
}
