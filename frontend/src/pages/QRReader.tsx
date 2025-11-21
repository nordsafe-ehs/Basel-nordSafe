import { Button, Stack } from "@mui/material";
import { Scanner, type IDetectedBarcode } from "@yudiel/react-qr-scanner";
import { useRef } from "react";
import { API_URL } from "../API_URL";
import { useAlert } from "../context/AlertContext";
import { useToken } from "../hooks/useToken";
import { Link } from "react-router-dom";

const QRReader: React.FC = () => {
  const { token } = useToken();
  const { closeAlert, showAlert } = useAlert();

  const lastScannedRef = useRef<string | null>(null);
  const isProcessingRef = useRef<boolean>(false);

  const handleScan = async (codes: IDetectedBarcode[]) => {
    const value = codes[0]?.rawValue;
    if (!value) return;

    if (isProcessingRef.current || lastScannedRef.current === value) return;

    isProcessingRef.current = true;
    lastScannedRef.current = value;

    try {
      closeAlert();
      const res = await fetch(`${API_URL}/entrance-log`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ProjectId: value,
        }),
      });

      const data = await res.json();
      showAlert(data.message, res.ok ? "success" : "error");
    } catch (err) {
      console.log(err);
      showAlert("Something went wrong", "error");
    } finally {
      setTimeout(() => {
        isProcessingRef.current = false;
      }, 1500);
    }
  };

  return (
    <Stack width="100vw" height="100vh" alignItems="center" justifyContent="center">
      <Button component={Link} to="/" sx={{ textDecoration: "underline" }}>
        Go back to the system
      </Button>
      <Stack maxWidth={500} mx="auto" overflow="hidden" borderRadius={1}>
        <Scanner onScan={handleScan} />
      </Stack>
    </Stack>
  );
};

export default QRReader;
