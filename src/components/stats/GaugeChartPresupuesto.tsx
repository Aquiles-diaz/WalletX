import React from "react";
import {
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
  ResponsiveContainer,
} from "recharts";

interface GaugeChartProps {
  percentage: number;
}

const GaugeChartPresupuesto: React.FC<GaugeChartProps> = ({ percentage }) => {
  const data = [
    {
      name: "usado",
      value: percentage,
      fill:
        percentage < 50
          ? "#00FFAA"
          : percentage < 80
          ? "#FFC300"
          : "#FF4444",
    },
  ];

  return (
    <div className="bg-neutral-900/80 rounded-xl p-6 shadow-lg flex flex-col items-center">
      <h3 className="text-white font-semibold mb-4 text-center">
        Uso del presupuesto
      </h3>
      <ResponsiveContainer width={200} height={130}>
        <RadialBarChart
          cx="50%"
          cy="100%"
          innerRadius="70%"
          outerRadius="100%"
          startAngle={180}
          endAngle={0}
          data={data}
        >
          <PolarAngleAxis
            type="number"
            domain={[0, 100]}
            angleAxisId={0}
            tick={false}
          />
          <RadialBar
            dataKey="value"
            cornerRadius={10}
            isAnimationActive={true}
            animationDuration={800}
            animationEasing="ease-out"
            background
          />
        </RadialBarChart>
      </ResponsiveContainer>
      <p className="text-white mt-2 font-semibold text-lg tracking-wide">
        {percentage.toFixed(1)}% usado
      </p>
    </div>
  );
};

export default GaugeChartPresupuesto;
