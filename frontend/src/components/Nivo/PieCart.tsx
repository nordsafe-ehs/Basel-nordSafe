import { ResponsivePie } from "@nivo/pie";

const deviationData = [
  { id: "Week 1", value: 27, color: "#172E4E" },
  { id: "Week 2", value: 23, color: "#36D399 " },
  { id: "Week 3", value: 18, color: "#FFFFFF" },
  { id: "Week 4", value: 32, color: "#E5EFFF" },
];

export const MyPie = ({ deviation }) => (
  <ResponsivePie
    data={deviationData}
    margin={{ top: 30, right: 30, bottom: 70, left: 30 }}
    innerRadius={0.6}
    padAngle={0.7}
    cornerRadius={3}
    activeOuterRadiusOffset={8}
    colors={({ data }) => data.color}
    borderWidth={1}
    borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
    arcLinkLabelsSkipAngle={360}
    arcLabelsSkipAngle={10}
    arcLabelsTextColor={{ from: "color", modifiers: [["darker", 2]] }}
    legends={[
      {
        anchor: "bottom",
        direction: "row",
        translateY: 40,
        itemWidth: 80,
        itemHeight: 20,
        symbolShape: "circle",
      },
    ]}
    motionConfig="gentle"
    layers={[
      "arcs",
      "arcLabels",
      "arcLinkLabels",
      "legends",
      ({ centerX, centerY }) => (
        <text
          x={centerX}
          y={centerY}
          textAnchor="middle"
          dominantBaseline="central"
          style={{ fontSize: "12px", fontWeight: "bold", fill: "#333" }}
        >
          <tspan
            style={{ fontSize: "36px", fill: "#222" }}
            x={centerX}
            dy="-0.4em"
          >
            {deviation}
          </tspan>
          <tspan
            style={{ fontSize: "14px", fill: "#666" }}
            x={centerX}
            dy="2em"
          >
            this week
          </tspan>
        </text>
      ),
    ]}
  />
);
