import { EditRounded, RemoveRedEyeRounded } from "@mui/icons-material";
import { IconButton, Stack, Tooltip, Typography } from "@mui/material";
import { DataGrid, GridColDef, GridRow } from "@mui/x-data-grid";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_URL, UPLOADS_FILE_BASE_URL } from "../API_URL";
import { useAlert } from "../context/AlertContext";
import { useTriggers } from "../context/TriggersContext";
import { useGetLink } from "../hooks/useGetLink";
import { useToken } from "../hooks/useToken";
import { Action } from "../types/Sidebar";
import { flattenInputs } from "../utils/functions";
import { useTranslation } from "react-i18next";

const List = () => {
  const link = useGetLink();
  const [data, setData] = useState<{ [key: string]: string }[]>([]);
  const { t } = useTranslation();
  const { token, activeProject, decodedToken } = useToken();
  const [loading, setLoading] = useState<boolean>(true);
  const { closeAlert, showAlert } = useAlert();
  const navigate = useNavigate();
  const { reloadTrigger, setReloadTrigger } = useTriggers();
  const editPermissions = ["admin", "super-admin"];

  const getData = useCallback(async () => {
    if (!link || (!link.columns && !link.inputs)) return;
    const API_ROUTE = link.href?.replace(
      /\/list|\/safety-tools\/checklists|\//gi,
      ""
    );
    let endpoint = `reports?type=${API_ROUTE}&projectId=${activeProject?.id}&list`;

    if (link.endpoint) {
      endpoint = link.endpoint + `?projectId=${activeProject?.id}&list`;
      if (link.endpoint == "checklists")
        endpoint = `checklists?name=${API_ROUTE}&projectId=${activeProject?.id}&list`;
    }

    setLoading(true);

    const res = await fetch(`${API_URL}/${endpoint}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    setLoading(false);
    if (res.ok) setData(data);
  }, [link, token, activeProject]);

  useEffect(() => {
    getData();
  }, [getData]);

  const columns = useMemo(() => {
    const c =
      link?.columns?.map((column) => ({
        headerName:
          column.headerName ||
          column.field
            .replace(/_/gi, " ")
            .split("")
            .map((char, index) => {
              if (index === 0) return char.toUpperCase();
              if (char === " ") return " ";
              return char.toLowerCase();
            })
            .join(""),
        minWidth: 150,
        flex: 1,
        ...column,
      })) || [];
    if (!link?.inputs) {
      if (link?.columns) return c;
      return [];
    }

    return [
      ...flattenInputs(link.inputs, true).map(
        (input) =>
          ({
            headerName: input.label,
            field: input.name,
            minWidth: 150,
            flex: 1,
            renderCell: (params) => {
              if (input.type == "file")
                return (
                  <Link
                    to={UPLOADS_FILE_BASE_URL + "/" + params.value}
                    target="_blank"
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    {params.value}
                  </Link>
                );
            },
          } as GridColDef)
      ),
      ...c,
    ];
  }, [link?.columns, link?.inputs]);

  useEffect(() => {
    if (!reloadTrigger) return;
    setReloadTrigger(false);
    getData();
  }, [reloadTrigger, setReloadTrigger, getData]);

  if (!link || (!link.columns && !link.inputs))
    return <Typography>{t("Something went wrong")}</Typography>;

  return (
    <>
      <Stack
        sx={{
          width: 1,
          minHeight: loading || !data.length ? 400 : 0,
          // " .green": {
          //   bgcolor: "#0f02",
          //   "&:hover": {
          //     bgcolor: "#0f02",
          //   },
          // },
          // " .orange": {
          //   bgcolor: "#ff02",
          //   "&:hover": {
          //     bgcolor: "#ff02",
          //   },
          // },
          // " .red": {
          //   bgcolor: "#f002",
          //   "&:hover": {
          //     bgcolor: "#f002",
          //   },
          // },
        }}
      >
        <DataGrid
          // getRowClassName={({ row }) => {
          //   if (!link.keyValueColors) return "";
          //   const key: string = row[link.keyValueColors.key];
          //   return link.keyValueColors.values[key];
          // }}
          onRowClick={(params) => {
            if (link.viewLink) navigate(link.viewLink(params.id));
          }}
          loading={loading}
          rows={data.map((row) => {
            const newRow: { [key: string]: string } = {};
            for (const key in row) {
              if (Object.prototype.hasOwnProperty.call(row, key)) {
                if (row[key] == null) {
                  newRow[key] = "-";
                  continue;
                }
                newRow[key] = `${row[key]}`.replace(/_/g, " ");
              }
            }
            return link.actions ? { ...newRow, actions: "123" } : newRow;
          })}
          columns={
            link.actions ||
            (link.editLink && editPermissions.includes(decodedToken.role)) ||
            link.viewLink
              ? [
                  ...columns,
                  {
                    headerName: "Actions",
                    field: "actions",
                    sortable: false,
                    filterable: false,
                    hideable: false,
                    width:
                      (link.editLink ? 50 : 0) +
                      (link.viewLink ? 50 : 0) +
                      (link.actions ? link.actions.length * 40 : 0) +
                      20,
                    minWidth: 100,
                    renderCell: ({ row }) => (
                      <Stack
                        pt={0.5}
                        direction="row"
                        alignItems="center"
                        gap={1}
                      >
                        {[
                          ...(link.actions || []),
                          ...[
                            link.editLink &&
                            editPermissions.includes(decodedToken.role)
                              ? ({
                                  color: "blue",
                                  icon: <EditRounded />,
                                  onClick: ({ row, event }) => {
                                    if (link.editLink) {
                                      navigate(link.editLink(row.id));
                                      event.stopPropagation();
                                    }
                                  },
                                } as Action)
                              : null,
                          ],
                          ...[
                            link.viewLink
                              ? ({
                                  color: "green",
                                  icon: <RemoveRedEyeRounded />,
                                  onClick: ({ row }) => {
                                    if (link.viewLink)
                                      navigate(link.viewLink(row.id));
                                  },
                                } as Action)
                              : null,
                          ],
                        ]
                          .filter((item) => item)
                          // @ts-expect-error 123
                          .map(({ onClick, icon, color }, i) => (
                            <IconButton
                              key={i}
                              onClick={(event) =>
                                onClick({
                                  row,
                                  token,
                                  reloadData: getData,
                                  showAlert,
                                  closeAlert,
                                  activeProject,
                                  event,
                                })
                              }
                              sx={{
                                color,
                              }}
                            >
                              {icon}
                            </IconButton>
                          ))}
                      </Stack>
                    ),
                  },
                ]
              : columns
          }
          initialState={{
            pagination: {
              paginationModel: {
                page: 0,
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5, 10]}
          showToolbar
          localeText={{
            toolbarExportCSV: "Export to excel",
          }}
          slotProps={{
            toolbar: {
              printOptions: { disableToolbarButton: true },
            },
          }}
          slots={{
            row: (props) => (
              <Tooltip
                followCursor
                title={link.viewLink ? "Click to view" : ""}
              >
                <GridRow {...props} />
              </Tooltip>
            ),
          }}
          disableColumnMenu
          rowSelection={false}
          disableColumnResize
          sx={{
            "& .MuiDataGrid-row": {
              cursor: "pointer",
            },
          }}
          {...link?.dataGridCustomProps}
        />
      </Stack>
    </>
  );
};

export default List;
