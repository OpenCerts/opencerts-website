import { get } from "axios";

export const decodeQrCode = qrCode => {
  const ttRegex = /tradetrust:\/\/(.*)/;
  if (!ttRegex.test(qrCode))
    throw new Error("QR Code is not formatted to TradeTrust specifications");
  const [, encodedPayload] = ttRegex.exec(qrCode);
  const decodedPayload = JSON.parse(decodeURIComponent(encodedPayload));
  return decodedPayload;
};

export const encodeQrCode = payload =>
  `tradetrust://${encodeURIComponent(JSON.stringify(payload))}`;

export const processQrCode = async qrCode => {
  const { uri } = decodeQrCode(qrCode);
  const { data } = await get(uri);
  return data;
};
