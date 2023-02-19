import { QRCodeSVG } from "qrcode.react";

export const Qrcode = ({ value }) => {
  return (
    <QRCodeSVG value={value} size="400" bgColor="#060047" fgColor="#ffffff" />
  );
};
