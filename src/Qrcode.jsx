import { QRCodeCanvas } from "qrcode.react";
import { motion } from "framer-motion";

export const Qrcode = ({ value, color }) => {
  return (
    <motion.div
      animate={{ scale: [0, 1, 0.5, 1] }}
      transition={{ times: [0, 0.1, 0.9, 1] }}
    >
      <QRCodeCanvas
        id="qrcode"
        value={value}
        size="400"
        bgColor={color}
        fgColor="#fff"
        imageSettings={{
          src: "https://i.imgur.com/pNiGIlz.png",
          x: undefined,
          y: undefined,
          height: 100,
          width: 100,
          excavate: true,
        }}
      />
      ;
    </motion.div>
  );
};
