import { Button, Input } from "@mui/material";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Qrcode } from "./Qrcode";

function App() {
  const [value, setValue] = useState("");
  const [validationURL, setValidationURL] = useState(false);

  const expression =
    /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
  var regex = new RegExp(expression);

  const handleChange = (e) => {
    setValidationURL(false);
    setValue(e.target.value);
  };

  const handleClick = () => {
    if (value.match(regex)) {
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

  return (
    <div className="App">
      <div
        style={{
          marginTop: "100px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <h1 style={{ textAlign: "center" }}>QRcode Generate</h1>
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
          onClick={handleClick}
        >
          Generate
        </Button>
      </div>

      {validationURL && (
        <div
          style={{
            marginTop: "100px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <h1 style={{ textAlign: "center" }}>Qrcode</h1>
          <Qrcode value={value} />
        </div>
      )}
      <ToastContainer />
    </div>
  );
}

export default App;
