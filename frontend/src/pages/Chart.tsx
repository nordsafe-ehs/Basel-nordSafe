import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import {
  BarElement,
  CategoryScale,
  ChartDataset,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import { useEffect, useMemo, useState } from "react";
import { Bar } from "react-chartjs-2";
import { useParams } from "react-router-dom";
import { API_URL } from "../API_URL";
import { useToken } from "../hooks/useToken";
import { useTranslation } from "react-i18next";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const colors = ["#FF5733", "#33B5FF", "#28A745", "#FFC107"];

const Chart = () => {
  const { token, activeProject } = useToken();
  const { id } = useParams();
  const { t } = useTranslation();
  const labels = useMemo(
    () => [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    []
  );
  const [data, setData] = useState<ChartDataset<"bar", number[]>[]>([]);
  const currentYear = new Date().getFullYear();
  const [year, setYear] = useState<number>(currentYear);

  useEffect(() => {
    (async () => {
      const res = await fetch(
        `${API_URL}/companies/chart?projectId=${activeProject?.id}&type=${id}&year=${year}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();
      if (!res.ok) return;
      const dataSet: ChartDataset<"bar", number[]>[] = [];
      let index = 0;
      for (const type in data) {
        if (Object.prototype.hasOwnProperty.call(data, type)) {
          const d = data[type];
          dataSet.push({
            label: `${type} ${id?.replace("-", " ")}`,
            data: labels.map((_, index) => {
              for (const date in d) {
                if (Object.prototype.hasOwnProperty.call(d, date)) {
                  if (new Date(date).getMonth() == index) return d[date];
                }
              }
              return 0;
            }),
            backgroundColor: colors[index],
          });
          index++;
        }
      }
      setData(dataSet);
    })();
  }, [activeProject, token, id, labels, year]);

  return (
    <>
      <FormControl fullWidth size="small">
        <InputLabel>{t("Year")}</InputLabel>
        <Select
          fullWidth
          label="Year"
          value={year}
          onChange={(e) => setYear(e.target.value as number)}
        >
          {new Array(30).fill(null).map((_, i) => (
            <MenuItem value={currentYear - i}>{currentYear - i}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <Bar
        options={{
          responsive: true,
          scales: {
            y: {
              ticks: {
                callback: function (value) {
                  return Number.isInteger(value) ? value : "";
                },
              },
            },
          },
        }}
        data={{
          labels,
          datasets: data,
        }}
      />
    </>
  );
};

export default Chart;
