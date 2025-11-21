import { Button, Stack } from "@mui/material";
import { GridRowId } from "@mui/x-data-grid";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useState } from "react";
import { API_URL } from "../API_URL";
import { useAlert } from "../context/AlertContext";
import { useTriggers } from "../context/TriggersContext";
import { useToken } from "../hooks/useToken";

const EntranceTimeInput = ({
  type,
  id,
  value,
}: {
  type: "out" | "extra";
  id: GridRowId;
  value?: string;
}) => {
  const [v, setV] = useState(value || "");
  const { token } = useToken();
  const { showAlert, closeAlert } = useAlert();
  const { setReloadTrigger } = useTriggers();

  const handleSendTime = async () => {
    closeAlert();
    const res = await fetch(`${API_URL}/entrance-log`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        id,
        time: v,
        type,
      }),
    });
    const data = await res.json();
    showAlert(data.message, res.ok ? "success" : "error");
    setReloadTrigger(true);
  };

  return (
    <Stack>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateTimePicker
          value={v ? dayjs(v as string) : null}
          onChange={(value) => {
            if (value) {
              setV(value.toString());
            }
          }}
          slotProps={{
            textField: {
              size: "small",
              fullWidth: true,
              sx: {
                mt: 0.5,
              },
            },
          }}
        />
      </LocalizationProvider>
      <Button onClick={handleSendTime}>
        Send {type === "out" ? "Out" : "Extra"} Time
      </Button>
    </Stack>
  );
};

export default EntranceTimeInput;
