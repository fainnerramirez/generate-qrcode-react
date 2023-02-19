import { QRCodeSVG } from "qrcode.react";
import useGenerateRandomColor from "./components/UseRamdomColor";

export const Qrcode = ({ value, color }) => {
  return <QRCodeSVG value={value} size="400" bgColor={color} fgColor="#fff" />;
};
