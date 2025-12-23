import  { useRef } from "react";
import SignatureCanvas from "react-signature-canvas";
import { Box, Button } from "@mui/material";

const SignatureField = ({ name, value, onChange }) => {
  const sigCanvas = useRef<SignatureCanvas>(null);

  const clear = () => {
    sigCanvas.current?.clear();
    onChange(name, "");
  };

const save = () => {
  const canvas = sigCanvas.current?.getCanvas();
  if (!canvas) return;
  const dataUrl = canvas.toDataURL("image/png");
  onChange(name, dataUrl); 
};


  return (
    <Box>
      <SignatureCanvas
        ref={sigCanvas}
        backgroundColor="#FFFFFF"
        penColor="black"
        canvasProps={{ width: 300, height: 130, className: "sigCanvas" }}
      />
      <Box mt={1} display="flex" gap={1}>
        <Button variant="outlined" onClick={clear}>
          Clear
        </Button>
        <Button variant="contained" onClick={save}>
          Save
        </Button>
      </Box>
    </Box>
  );
};

export default SignatureField;







