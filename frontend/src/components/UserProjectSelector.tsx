import {
  Autocomplete,
  Checkbox,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { API_URL } from "../API_URL";
import { useAlert } from "../context/AlertContext";
import { useToken } from "../hooks/useToken";

const UserProjectSelector = ({ row }: { row: { [key: string]: string } }) => {
  const [value, setValue] = useState<{ id: string; fullname: string }[]>(
    JSON.parse(row.users || "[]")
  );
  const [users, setUsers] = useState<{ id: string; fullname: string }[]>([]);
  const { token } = useToken();
  const { showAlert, closeAlert } = useAlert();

  useEffect(() => {
    (async () => {
      const res = await fetch(`${API_URL}/users`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (res.ok) setUsers(data);
    })();
  }, [token]);

  return (
    <Stack pt={1.5}>
      <Autocomplete
        multiple
        disableCloseOnSelect
        options={users}
        value={value}
        onChange={async (_, newValue) => {
          setValue(newValue);
          closeAlert();
          const res = await fetch(`${API_URL}/projects/users`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              users: newValue.map(({ id }) => id),
              projectId: row.id,
            }),
          });
          const data = await res.json();
          showAlert(data.message, res.ok ? "success" : "error");
        }}
        getOptionLabel={(option) => option.fullname}
        isOptionEqualToValue={(option, val) => option.id === val.id}
        renderTags={() => null} // Hide chips
        renderInput={(params) => (
          <TextField
            {...params}
            size="small"
            label="Users"
            InputProps={{
              ...params.InputProps,
              startAdornment: (
                <Typography
                  variant="body2"
                  sx={{ ml: 1, color: "text.primary" }}
                >
                  {value.length === 0
                    ? "No users selected"
                    : `${value.length} user${
                        value.length > 1 ? "s" : ""
                      } selected`}
                </Typography>
              ),
            }}
          />
        )}
        renderOption={(props, option, { selected }) => (
          <li {...props}>
            <Checkbox
              style={{ marginRight: 8 }}
              checked={selected}
              size="small"
            />
            <Typography variant="body2">{option.fullname}</Typography>
          </li>
        )}
      />
    </Stack>
  );
};

export default UserProjectSelector;
