import { SaveRounded } from "@mui/icons-material";
import {
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TablePagination,
  TextField,
  Tooltip,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { MouseEvent, useState } from "react";
import { API_URL } from "../API_URL";
import { useAlert } from "../context/AlertContext";
import { useToken } from "../hooks/useToken";

interface SDSItem {
  doc_id: string;
  product_name: string;
  product_code: string;
  mfg_detail: string[];
  issue_date: string;
  country: string;
  lang: string;
}

interface Form {
  product_name: string;
  language: string;
}

const SDSSearch = () => {
  const [SDSItems, setSDSItems] = useState<SDSItem[]>([]);
  const [form, setForm] = useState<Form>({
    product_name: "",
    language: "English_en",
  });
  const { token } = useToken();
  const [loading, setLoading] = useState(false);
  const [totalRows, setTotalRows] = useState(0);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(25);
  const { closeAlert, showAlert } = useAlert();

  const fetchSDS = async (_page = page, _pageSize = pageSize) => {
    setLoading(true);
    closeAlert();

    const res = await fetch(API_URL + "/sds/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        ...form,
        page: _page,
        pageSize: _pageSize,
      }),
    });
    const data = await res.json();

    setLoading(false);

    if (!res.ok) {
      showAlert(data.message || "Failed to fetch SDS data", "error");
      return;
    }

    setSDSItems(data.datalist);
    setTotalRows(data.paging.totalRows);
    setPage(page);
    setPageSize(pageSize);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchSDS(0, pageSize);
  };

  const handlePageChange = (
    _event: MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    fetchSDS(newPage, pageSize);
  };

  const handlePageSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSize = parseInt(event.target.value, 10);
    fetchSDS(0, newSize);
  };

  const handleSave = async (row: SDSItem) => {
    closeAlert();

    const res = await fetch(API_URL + "/sds", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(row),
    });
    const data = await res.json();

    showAlert(data.message, res.ok ? "success" : "error");
  };

  return (
    <>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        width={1}
        mb={2}
        gap={{ xs: 1, sm: 0 }}
        sx={{
          borderCollapse: "collapse",
        }}
      >
        <TextField
          value={form.product_name}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, product_name: e.target.value }))
          }
          label="Product Name"
          fullWidth
          size="small"
          sx={{
            fieldset: {
              borderRadius: { xs: 1, sm: "10px 0 0 10px" },
            },
          }}
        />
        <FormControl
          sx={{
            minWidth: 200,
          }}
        >
          <InputLabel>Language</InputLabel>
          <Select
            size="small"
            label="Language"
            sx={{
              fieldset: {
                borderRadius: { xs: 1, sm: 0 },
              },
            }}
            value={form.language}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, language: e.target.value }))
            }
          >
            <MenuItem value="English_en">English</MenuItem>
            <MenuItem value="Norwegian_no">Norwegian</MenuItem>
            <MenuItem value="Danish_da">Danish</MenuItem>
            <MenuItem value="Finnish_fi">Finnish</MenuItem>
            <MenuItem value="Swedish_sv">Swedish</MenuItem>
            <MenuItem value="Polish_pl">Polish</MenuItem>
            <MenuItem value="Lithuanian_lt">Lithuanian</MenuItem>
          </Select>
        </FormControl>
        <Button
          disableElevation
          variant="contained"
          sx={{ borderRadius: { xs: 1, sm: "0 10px 10px 0" } }}
          onClick={handleSearch}
        >
          Search
        </Button>
      </Stack>

      {(!!SDSItems.length || loading) && (
        <Stack minHeight={300}>
          <TablePagination
            component="div"
            count={totalRows}
            page={page}
            onPageChange={handlePageChange}
            rowsPerPage={pageSize}
            onRowsPerPageChange={handlePageSizeChange}
            rowsPerPageOptions={[25, 50, 100]}
          />
          <DataGrid
            sx={{ border: 0 }}
            loading={loading}
            rows={SDSItems.map((item) => ({
              ...item,
              id: item.doc_id,
              mfg_detail: item.mfg_detail || "-",
            }))}
            columns={[
              {
                minWidth: 150,
                flex: 1,
                headerName: "Product Name",
                field: "product_name",
              },
              {
                minWidth: 150,
                flex: 1,
                headerName: "Product Code",
                field: "product_code",
              },
              {
                minWidth: 150,
                flex: 1,
                headerName: "Manufacturer Detail",
                field: "mfg_detail",
              },
              {
                minWidth: 150,
                flex: 1,
                headerName: "Issue Date",
                field: "issue_date",
              },
              {
                minWidth: 150,
                flex: 1,
                headerName: "Country",
                field: "country",
              },
              {
                minWidth: 150,
                flex: 1,
                headerName: "Language",
                field: "lang",
              },
              {
                headerName: "Actions",
                field: "actions",
                renderCell: ({ row }) => {
                  return (
                    <Stack direction="row" alignItems="center" height={1}>
                      <Tooltip title="Save">
                        <IconButton onClick={() => handleSave(row)}>
                          <SaveRounded />
                        </IconButton>
                      </Tooltip>
                    </Stack>
                  );
                },
              },
            ]}
            rowCount={totalRows}
            paginationMode="server"
            paginationModel={{
              page,
              pageSize,
            }}
            onPaginationModelChange={(model) => {
              fetchSDS(model.page, model.pageSize);
            }}
            pageSizeOptions={[25, 50, 100]}
            hideFooterPagination
            hideFooter
            disableAutosize
            disableColumnFilter
            disableColumnMenu
            disableColumnResize
            disableColumnSelector
            disableColumnSorting
            disableDensitySelector
            disableEval
            disableMultipleRowSelection
            disableRowSelectionOnClick
            disableVirtualization
          />
          <TablePagination
            component="div"
            count={totalRows}
            page={page}
            onPageChange={handlePageChange}
            rowsPerPage={pageSize}
            onRowsPerPageChange={handlePageSizeChange}
            rowsPerPageOptions={[25, 50, 100]}
          />
        </Stack>
      )}
    </>
  );
};

export default SDSSearch;
