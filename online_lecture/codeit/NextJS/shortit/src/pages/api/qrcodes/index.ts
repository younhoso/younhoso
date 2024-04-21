import { NextApiRequest, NextApiResponse } from "next";
import QRCode from "@/db/models/QRCode";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch(req.method) {
    case 'GET':
      const newQRCodes = await QRCode.find();
      res.send(newQRCodes);
      break;

    case 'POST':
      const qrcodes = await QRCode.find();
      res.send(qrcodes);
      break;

    default:
      res.status(404).send(null)
  }
}