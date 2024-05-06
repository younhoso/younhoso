import mongoose from "mongoose";

const qrcodeSchema = new mongoose.Schema(
  {
    title: {type: String, default: ''},
    url: {type: String, default: ''}
  },
  {
    timestamps: true
  }
);

const QRCode = mongoose.models['QRcode'] || mongoose.model('QRCode', qrcodeSchema);

export default QRCode;