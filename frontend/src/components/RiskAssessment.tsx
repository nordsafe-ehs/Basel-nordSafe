import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { IconButton, Box, Tooltip } from "@mui/material";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import DeleteIcon from "@mui/icons-material/Delete";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import AddIcon from "@mui/icons-material/Add";
import { API_URL } from "../API_URL";
import { useToken } from "../hooks/useToken";
import { riskColumns } from "../data/RiskAssesment/column";

const RiskAssessment = () => {
  const [rows, setRows] = useState<any[]>([]);
  const [hiddenRows, setHiddenRows] = useState<number[]>([]);
  const { token } = useToken();

  // ✅ جلب البيانات
  const fetchData = async () => {
    try {
      const res = await fetch(`${API_URL}/risk-evaluations`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setRows(data.data || data);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [token]);

  // ✅ دالة حساب Risk Score و Level
  const toInt = (v: any) => {
    const n = Number(v);
    return Number.isFinite(n) ? n : 0;
  };

  const calculateRisk = (row: any) => {
    const Lb = toInt(row.base_likelihood);
    const Sb = toInt(row.base_severity);
    const Lr = toInt(row.residual_likelihood);
    const Sr = toInt(row.residual_severity);

    const baseScore = Lb * Sb;
    const residualScore = Lr * Sr;

    const baseLevel =
      baseScore >= 15 ? "High" : baseScore >= 9 ? "Medium" : "Low";
    const residualLevel =
      residualScore >= 15 ? "High" : residualScore >= 9 ? "Medium" : "Low";

    return {
      ...row,
      base_risk_score: baseScore,
      base_risk_level: baseLevel,
      residual_risk_score: residualScore,
      residual_risk_level: residualLevel,
    };
  };

  // ✅ تحديث أو إضافة صف
  const processRowUpdate = async (newRow: any) => {
    const updatedRow = calculateRisk(newRow);

    try {
      let res;
      if (String(updatedRow.id).startsWith("temp")) {
        // إضافة جديدة
        res = await fetch(`${API_URL}/risk-evaluations`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedRow),
        });
      } else {
        // تحديث موجود
        res = await fetch(`${API_URL}/risk-evaluations/${updatedRow.id}`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedRow),
        });
      }

      if (!res.ok) throw new Error("Save failed");
      const apiData = await res.json();
      const saved = apiData.data || apiData;

      // لو كان id مؤقت، استبدله بالـ id الحقيقي من السيرفر
      const finalRow =
        String(updatedRow.id).startsWith("temp") && saved.id
          ? { ...updatedRow, id: saved.id }
          : updatedRow;

      return finalRow;
    } catch (err) {
      console.error("Save error:", err);
      throw err;
    }
  };

  // ✅ إضافة صف جديد فارغ للجدول
  const handleAddRow = () => {
    const tempId = "temp-" + Date.now();
    setRows((prev) => [
      ...prev,
      {
        id: tempId,
        activity_name: "",
        identified_hazards: "",
        people_involved: "",
        base_likelihood: 1,
        base_severity: 1,
        control_measures: "",
        residual_likelihood: 1,
        residual_severity: 1,
        person_responsible: "",
      },
    ]);
  };

  // ✅ حذف صف
  const handleDeleteRow = async (id: number) => {
    try {
      const res = await fetch(`${API_URL}/risk-evaluations/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Delete failed");
      setRows((prev) => prev.filter((row) => row.id !== id));
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  // ✅ عمود Actions
  const actionColumn = {
    field: "actions",
    headerName: "Actions",
    width: 150,
    sortable: false,
    filterable: false,
    renderCell: (params: any) => (
      <>
        <Tooltip title="Delete">
          <IconButton
            color="error"
            onClick={() => handleDeleteRow(params.row.id)}
          >
            <DeleteIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Hide">
          <IconButton
            color="default"
            onClick={() => setHiddenRows((prev) => [...prev, params.row.id])}
          >
            <VisibilityOffIcon />
          </IconButton>
        </Tooltip>
      </>
    ),
  };

  // ✅ Toolbar
  const CustomToolbar = () => (
    <Box display="flex" justifyContent="flex-end" p={1} gap={1}>
      <Tooltip title="Add New">
        <IconButton color="primary" onClick={handleAddRow}>
          <AddIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Show All Hidden Rows">
        <IconButton color="secondary" onClick={() => setHiddenRows([])}>
          <VisibilityOffIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Export Excel">
        <IconButton color="primary" onClick={() => console.log("Export")}>
          <FileDownloadIcon />
        </IconButton>
      </Tooltip>
    </Box>
  );

  return (
    <Box>
      <h2 style={{ margin: "8px" }}>Risk Assessment Records</h2>
      <Box sx={{ border: "1px solid #ccc", borderRadius: "8px", height: 600 }}>
        <CustomToolbar />
        <DataGrid
          rows={rows.filter((row) => !hiddenRows.includes(row.id))}
          columns={[...riskColumns, actionColumn]}
          getRowId={(row) => row.id}
          pageSize={10}
          rowsPerPageOptions={[10, 20, 50]}
          processRowUpdate={processRowUpdate}
          onProcessRowUpdateError={(error) => console.error(error)}
          experimentalFeatures={{ newEditingApi: true }}
        />
      </Box>
    </Box>
  );
};

export default RiskAssessment;
