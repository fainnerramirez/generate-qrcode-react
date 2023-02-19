import { Button, Input } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Qrcode } from "./Qrcode";
import useGenerateRandomColor from "./hooks/UseRamdomColor";
import { AiOutlineCloudDownload } from "react-icons/ai";
import { TbArrowsRandom } from "react-icons/tb";
import html2Canvas from "html2canvas";

function App() {
  const [value, setValue] = useState("");
  const [validationURL, setValidationURL] = useState(false);
  const { color, generateColor } = useGenerateRandomColor();
  const [, setColor] = useState("#000000");
  const [dataURLDownload, setDataURLDownload] = useState(null);

  useEffect(() => {
    console.log("dataURLDownload", dataURLDownload);
    const getURLDownload = () => {
      const canvas = document.querySelector("#qrcode");
      console.log("canvas", canvas);

      html2Canvas(document.querySelector("#container-qrcode"), {
        useCORS: true,
      }).then((canvas) => {
        let pageData = canvas.toDataURL("image/png", 1.0);
        setDataURLDownload(pageData);
      });

      return dataURLDownload;
    };

    let data = getURLDownload();
    console.log("data", data);
    setDataURLDownload(data);
  }, [dataURLDownload]);

  const expression =
    /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
  var regex = new RegExp(expression);

  const buttonRefDownload = useRef(null);

  const handleChange = (e) => {
    setValidationURL(false);
    setValue(e.target.value);
  };

  const handleClick = (e) => {
    e.preventDefault();
    if (value.match(regex)) {
      setColor(generateColor());
      console.log("color", color);
      toast.success("QRcode Generado...!", {
        position: toast.POSITION.BOTTOM_CENTER,
        icon: "👌",
      });
    } else {
      toast.warn("Ingresa una URL válida...!", {
        position: toast.POSITION.BOTTOM_CENTER,
        icon: "🚫",
      });
    }

    setValidationURL(value.match(regex) ? true : false);
  };

  const handleClicDownload = (e) => {
    e.preventDefault();
    console.log("descargar");
  };

  return (
    <div
      className="App"
      style={{
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          marginTop: "100px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <h1 style={{ textAlign: "center" }}>
          QRcode Generate - Fainner ramirez
        </h1>
        <Input
          onChange={handleChange}
          placeholder="URL generate qrcode"
          value={value}
          autoFocus
          style={{ width: "500px", marginTop: "30px" }}
        />
        <Button
          style={{ marginTop: "30px" }}
          variant="contained"
          color="primary"
          size="large"
          onClick={handleClick}
          disabled={validationURL && value.length > 0}
        >
          Generate QRcode
        </Button>
      </div>

      <div
        style={{
          marginTop: "100px",
          marginLeft: "400px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        {validationURL && (
          <div id="container-qrcode">
            <h1 style={{ textAlign: "center" }}>Qrcode</h1>
            <Qrcode value={value} color={"#" + color} className="fainner" />
          </div>
        )}

        {validationURL && (
          <div style={{ marginTop: "50px" }}>
            <Button
              variant="contained"
              color="success"
              endIcon={<TbArrowsRandom />}
            >
              Random color
            </Button>
            <Button
              ref={buttonRefDownload}
              variant="contained"
              color="info"
              endIcon={<AiOutlineCloudDownload />}
              download={value + "_Qrcode.png"}
              href={dataURLDownload ?? "#"}
            >
              Download
            </Button>
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;
