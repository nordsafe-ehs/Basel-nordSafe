import { useState, useEffect } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import axios from "axios";
import {
  Box,
  IconButton,
  TextField,
  Tooltip,
  Menu,
  MenuItem,
  InputAdornment,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import DownloadIcon from "@mui/icons-material/Download";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import FilterListIcon from "@mui/icons-material/FilterList";
import SearchIcon from "@mui/icons-material/Search";
import { API_URL } from "../../API_URL";

const deleteMeeting = async (id: number) => {
  try {
    const res = await axios.delete(`${API_URL}/meetings/${id}`);
    return res.data;
  } catch (err: any) {
    console.error("Error deleting meeting:", err);
    throw err;
  }
};

const MeetingList = () => {
  const [rows, setRows] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<string | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        const res = await axios.get(`${API_URL}/meetings`);
        setRows(res.data);
      } catch (err) {
        console.error("Error fetching meetings:", err);
      }
    };
    fetchMeetings();
  }, []);

  // ✅ فلترة حسب البحث + الحالة
  const filteredRows = rows.filter((row) => {
    const matchesSearch = row.title
      ?.toLowerCase()
      .includes(search.toLowerCase());
    const matchesFilter = filter ? row.status === filter : true;
    return matchesSearch && matchesFilter;
  });

  // ✅ دالة تصدير CSV
  const exportCSV = () => {
    const header = Object.keys(rows[0] || {}).join(",");
    const csv = [
      header,
      ...rows.map((row) => Object.values(row).join(",")),
    ].join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "meetings.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 80 },
    { field: "meetingDate", headerName: "Meeting Date", width: 160 },
    { field: "title", headerName: "Meeting Title", width: 160, editable: true },
    {
      field: "description",
      headerName: "Description",
      width: 160,
      editable: true,
    },
    { field: "classification", headerName: "Classification", width: 160 },
    { field: "status", headerName: "Status", width: 120, editable: true },
    { field: "company", headerName: "Company", width: 160, editable: true },
    { field: "project", headerName: "Project", width: 160, editable: true },
    { field: "attenders", headerName: "Attenders", width: 140, editable: true },
    {
      field: "participant",
      headerName: "Participant",
      width: 140,
      editable: true,
    },
    { field: "duration", headerName: "Duration (min)", width: 140 },
    {
      field: "actions",
      headerName: "Actions",
      width: 100,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <IconButton
          color="error"
          onClick={async () => {
            try {
              await deleteMeeting(params.row.id);
              setRows((prevRows) =>
                prevRows.filter((row) => row.id !== params.row.id)
              );
            } catch (err) {
              alert("Failed to delete meeting");
            }
          }}
        >
          <DeleteIcon />
        </IconButton>
      ),
    },
  ];

  return (
    <div style={{ height: 600, width: "100%" }}>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        mb={1}
        mx={3}
      >
        <TextField
          label="Search"
          variant="outlined"
          size="small"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{
            width: 700,
            "& .MuiOutlinedInput-root": {
              borderRadius: "25px", // ✅ هنا الحواف
            },
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon color="primary" />
              </InputAdornment>
            ),
          }}
        />

        <Box display="flex" gap={1}>
          <Tooltip title="Download">
            <IconButton onClick={exportCSV}>
              <DownloadIcon sx={{ color: "#172E4E" }} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Grid View">
            <IconButton>
              <ViewModuleIcon sx={{ color: "#172E4E" }} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Filter" sx={{background:'#F0FFF8'}}>
            <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
              <FilterListIcon sx={{ color: "#172E4E" }} />
              <Typography variant="caption" sx={{ ml: 0.5 }}>
                Filter
              </Typography>
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      {/* ✅ قائمة الفلترة */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem
          onClick={() => {
            setFilter(null);
            setAnchorEl(null);
          }}
        >
          All
        </MenuItem>
        <MenuItem
          onClick={() => {
            setFilter("open");
            setAnchorEl(null);
          }}
        >
          Open
        </MenuItem>
        <MenuItem
          onClick={() => {
            setFilter("closed");
            setAnchorEl(null);
          }}
        >
          Closed
        </MenuItem>
      </Menu>

      {/* ✅ الجدول */}
      <DataGrid
        rows={filteredRows}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        processRowUpdate={(newRow, oldRow) => {
          setRows((prevRows) =>
            prevRows.map((row) => (row.id === oldRow.id ? newRow : row))
          );
          axios.put(`${API_URL}/meetings/${newRow.id}`, newRow).catch((err) => {
            console.error("Error updating meeting:", err);
            alert("Failed to update meeting");
          });
          return newRow;
        }}
        onProcessRowUpdateError={(error) => {
          console.error(error);
        }}
      />
    </div>
  );
};

export default MeetingList;




