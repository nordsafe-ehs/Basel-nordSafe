import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { API_URL } from "../API_URL";
import { CircularProgress, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export default function ParticipantsTable() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchParticipants();
  }, []);

  const fetchParticipants = () => {
    setLoading(true);
    fetch(`${API_URL}/participants`)
      .then((res) => res.json())
      .then((data) => {
        setRows(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching participants:", err);
        setLoading(false);
      });
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${API_URL}/participants/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        // تحديث الجدول بعد الحذف
        setRows((prev) => prev.filter((row) => row.id !== id));
      } else {
        console.error("Failed to delete participant");
      }
    } catch (err) {
      console.error("Error deleting participant:", err);
    }
  };

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "documentId", headerName: "Document ID", width: 150  },
    { field: "title", headerName: "Title", width: 200 },
    { field: "projectNumber", headerName: "Project Number", width: 150 },
    { field: "projectName", headerName: "Project Name", width: 200 },
    { field: "client", headerName: "Client", width: 200 },
    { field: "contract", headerName: "Contract", width: 200 },
    { field: "projectManager", headerName: "Project Manager", width: 200 },
    { field: "revisionNo", headerName: "Revision No", width: 120 },
    { field: "preparedBy", headerName: "Prepared By", width: 200 },
    { field: "approvedBy", headerName: "Approved By", width: 200 },
    { field: "name", headerName: "Name", width: 150 },
    { field: "position", headerName: "Position", width: 150 },
    { field: "signatureUrl", headerName: "Signature URL", width: 250 },
    {
      field: "actions",
      headerName: "Actions",
      width: 120,
      renderCell: (params) => (
        <IconButton color="error" onClick={() => handleDelete(params.row.id)}>
          <DeleteIcon />
        </IconButton>
      ),
    },
  ];

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: 20 }}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <div style={{ height: 600, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10, 20, 50]}
      />
    </div>
  );
}
