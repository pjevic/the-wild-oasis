/** @format */

import { PieChart, ResponsiveContainer, Pie, Cell, Legend, Tooltip } from "recharts";
import { useDarkMode } from "../../context/DarkModeContext";

import Heading from "../../ui/Heading";
import styled from "styled-components";

const ChartBox = styled.div`
  background-color: var(--color-gray-0);
  border: 1px solid var(--color-gray-100);
  border-radius: var(--border-radius-md);

  padding: 2.4rem 3.2rem;
  grid-column: 3 / span 2;

  & > *:first-child {
    margin-bottom: 1.6rem;
  }

  & .recharts-pie-label-text {
    font-weight: 600;
  }
`;

const durationData = [
  { label: "1 night", light: "#ef4444", dark: "#b91c1c" },
  { label: "2 nights", light: "#f97316", dark: "#c2410c" },
  { label: "3 nights", light: "#eab308", dark: "#a16207" },
  { label: "4-5 nights", light: "#84cc16", dark: "#4d7c0f" },
  { label: "6-7 nights", light: "#22c55e", dark: "#15803d" },
  { label: "8-14 nights", light: "#14b8a6", dark: "#0f766e" },
  { label: "15-21 nights", light: "#3b82f6", dark: "#1d4ed8" },
  { label: "21+ nights", light: "#a855f7", dark: "#7e22ce" },
];

function prepareData(stays, isDarkMode) {
  const baseData = durationData.map(({ label, light, dark }) => ({
    duration: label,
    value: 0,
    color: isDarkMode ? dark : light,
  }));

  const incrementValue = (arr, field) => {
    return arr.map((obj) =>
      obj.duration === field ? { ...obj, value: obj.value + 1 } : obj
    );
  };

  return stays
    .reduce((acc, { numNights }) => {
      const label =
        numNights === 1
          ? "1 night"
          : numNights === 2
          ? "2 nights"
          : numNights === 3
          ? "3 nights"
          : [4, 5].includes(numNights)
          ? "4-5 nights"
          : [6, 7].includes(numNights)
          ? "6-7 nights"
          : numNights >= 8 && numNights <= 14
          ? "8-14 nights"
          : numNights >= 15 && numNights <= 21
          ? "15-21 nights"
          : numNights >= 22
          ? "21+ nights"
          : null;

      return label ? incrementValue(acc, label) : acc;
    }, baseData)
    .filter((obj) => obj.value > 0);
}

function DurationChart({ confirmedStays }) {
  const { isDarkMode } = useDarkMode();
  const data = prepareData(confirmedStays, isDarkMode);

  return (
    <ChartBox>
      <Heading as="h2">Stay duration summary</Heading>

      <ResponsiveContainer width="100%" height={260}>
        <PieChart>
          <Tooltip />
          <Pie
            data={data}
            nameKey="duration"
            dataKey="value"
            innerRadius={85}
            outerRadius={110}
            cx="40%"
            cy="50%"
            paddingAngle={3}
          >
            {data.map(({ duration, color }) => (
              <Cell fill={color} stroke={color} key={duration} />
            ))}
          </Pie>
          <Legend
            verticalAlign="middle"
            align="right"
            width="30%"
            layout="vertical"
            iconSize={15}
            iconType="circle"
          />
        </PieChart>
      </ResponsiveContainer>
    </ChartBox>
  );
}

export default DurationChart;
