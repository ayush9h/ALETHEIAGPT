"use client";

import {
  PieChart,
  Pie,
  Legend,
  ResponsiveContainer,
  Cell,
  Tooltip,
} from "recharts";

export default function Dashboard() {
  const data02 = [
    { name: "HRPolicyTool", value: 100 },
    { name: "EmployeeAssistantTool", value: 300 },
    { name: "RedliningTool", value: 100 },
    { name: "ApplyLeaveTool", value: 80 },
    { name: "FestivalTool", value: 40 },
    { name: "ESGDPTool", value: 30 },
    { name: "QualityTool", value: 50 },
  ];

  const COLORS = [
    "#6366f1",
    "#22c55e",
    "#f59e0b",
    "#ef4444",
    "#06b6d4",
    "#8b5cf6",
    "#ec4899",
  ];

  return (
    <div className="w-full h-[30rem]">
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data02}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius="60%"
            outerRadius="80%"
          >
            {data02.map((_, index) => (
              <Cell
                key={index}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>

          <Tooltip />
          <Legend verticalAlign="bottom" />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
