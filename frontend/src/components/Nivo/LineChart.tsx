import React, { useEffect, useState } from "react";
import { ResponsiveLine } from "@nivo/line";

// نوع البيانات الموحدة
type ChartDataPoint = {
  date: string;
  riskHours: number;
  safetyHours: number;
  siteHours: number;
};

// دوال حساب المؤشرات (أمثلة مبسطة)
function calculateRiskHours(entry: any): number {
  const likelihood = Number(entry.likelihood || 0);
  const severity = Number(entry.severity || 0);
  return likelihood * severity;
}

function calculateSafetyHours(entry: any): number {
  const fields = Object.keys(entry).filter((key) => key.includes("_ok") || key.includes("_check"));
  return fields.reduce((sum, field) => sum + (entry[field] ? 1 : 0), 0);
}

function calculateSiteHours(entry: any): number {
  const fields = ["ppe_usage", "safety_signage", "emergency_preparedness", "housekeeping"];
  return fields.reduce((sum, field) => sum + (entry[field] === "yes" || entry[field] === "good" ? 1 : 0), 0);
}

// دالة لتجميع البيانات وتحويلها إلى شكل Nivo
function buildChartData(riskEntries: any[], safetyEntries: any[], siteEntries: any[]) {
  const grouped: Record<string, ChartDataPoint> = {};

  riskEntries.forEach((entry) => {
    const date = entry.date;
    if (!grouped[date]) grouped[date] = { date, riskHours: 0, safetyHours: 0, siteHours: 0 };
    grouped[date].riskHours += calculateRiskHours(entry);
  });

  safetyEntries.forEach((entry) => {
    const date = entry.date;
    if (!grouped[date]) grouped[date] = { date, riskHours: 0, safetyHours: 0, siteHours: 0 };
    grouped[date].safetyHours += calculateSafetyHours(entry);
  });

  siteEntries.forEach((entry) => {
    const date = entry.date;
    if (!grouped[date]) grouped[date] = { date, riskHours: 0, safetyHours: 0, siteHours: 0 };
    grouped[date].siteHours += calculateSiteHours(entry);
  });

  const groupedData = Object.values(grouped);

  return [
    {
      id: "Risk Assessment",
      color: "#4CAF50",
      data: groupedData.map((d) => ({ x: d.date, y: d.riskHours })),
    },
    {
      id: "Safety Tools",
      color: "#F44336",
      data: groupedData.map((d) => ({ x: d.date, y: d.safetyHours })),
    },
    {
      id: "Site Monitoring",
      color: "#003f5c",
      data: groupedData.map((d) => ({ x: d.date, y: d.siteHours })),
    },
  ];
}

// المكون الرئيسي
export const StatisticalReports: React.FC = () => {
  const [chartData, setChartData] = useState<any[]>([]);

  useEffect(() => {
    // بيانات تجريبية (mock) – لاحقًا تستبدلها ببيانات من API أو state
    const riskEntries = [
      { date: "01 Oct", likelihood: 2, severity: 3 },
      { date: "02 Oct", likelihood: 1, severity: 4 },
    ];
    const safetyEntries = [
      { date: "01 Oct", ppe_ok: true, equipment_check: true },
      { date: "02 Oct", ppe_ok: false, equipment_check: true },
    ];
    const siteEntries = [
      { date: "01 Oct", ppe_usage: "yes", safety_signage: "good" },
      { date: "02 Oct", ppe_usage: "no", safety_signage: "good" },
    ];

    const data = buildChartData(riskEntries, safetyEntries, siteEntries);
    setChartData(data);
  }, []);

  return (
    <div style={{ height: 400 }}>
      <h2>Statistical Reports</h2>
      <ResponsiveLine
        data={chartData}
        curve="monotoneX"
        margin={{ top: 40, right: 20, bottom: 60, left: 50 }}
        xScale={{ type: "point" }}
        yScale={{ type: "linear", min: 0, max: 12 }}
        axisBottom={{
          legend: "Date",
          legendOffset: 40,
          legendPosition: "middle",
          tickRotation: -35,
        }}
        axisLeft={{
          legend: "Hours",
          legendOffset: -40,
          legendPosition: "middle",
        }}
        colors={["#4CAF50", "#F44336", "#003f5c"]}
        pointSize={10}
        useMesh={true}
        enableSlices="x"
        legends={[
          {
            anchor: "top-right",
            direction: "column",
            translateX: 100,
            itemWidth: 100,
            itemHeight: 20,
            symbolSize: 12,
            symbolShape: "circle",
          },
        ]}
      />
    </div>
  );
};




// import { ResponsiveLine } from "@nivo/line";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import { API_URL } from "../../API_URL";

// export const MyLine = () => {
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     axios
//       .get(`${API_URL}/risk-evaluations/chart`)
//       .then((res) => {
//         console.log("Chart data:", res.data);
//         setData(res.data);
//       })
//       .catch((err) => console.error("Error fetching chart data:", err));
//   }, []);

//   if (data.length === 0) {
//     return <p>Loading chart...</p>; // تجنب شاشة بيضاء
//   }

//   return (
//     <ResponsiveLine
//       data={data}
//       margin={{ top: 40, right: 20, bottom: 60, left: 50 }}
//       xScale={{ type: "point" }}
//       yScale={{ type: "linear", min: 0, max: "auto", stacked: false }}
//       axisBottom={{
//         legend: "Date",
//         legendOffset: 40,
//         legendPosition: "middle",
//       }}
//       axisLeft={{
//         legend: "Risk Score",
//         legendOffset: -40,
//         legendPosition: "middle",
//       }}
//       colors={["#003f5c", "#0CB283"]}
//       pointSize={10}
//       pointBorderWidth={2}
//       pointBorderColor={{ from: "seriesColor" }}
//       useMesh={true}
//       legends={[
//         {
//           anchor: "top-right",
//           direction: "column",
//           translateX: 100,
//           itemWidth: 100,
//           itemHeight: 20,
//           symbolSize: 12,
//           symbolShape: "circle",
//         },
//       ]}
//     />
//   );
// };
