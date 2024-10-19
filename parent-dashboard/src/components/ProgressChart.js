import React from 'react';
import { RadialBarChart, RadialBar, Legend } from 'recharts';

const data = [
  { name: 'Legend1', value: 39, fill: '#8884d8' },
  { name: 'Legend2', value: 38, fill: '#83a6ed' },
  { name: 'Legend3', value: 27, fill: '#8dd1e1' },
  { name: 'Legend4', value: 22, fill: '#82ca9d' },
];

const ProgressChart = () => {
  return (
    <RadialBarChart
      width={300}
      height={300}
      cx={150}
      cy={150}
      innerRadius={20}
      outerRadius={140}
      barSize={10}
      data={data}
    >
      <RadialBar minAngle={15} background clockWise dataKey="value" />
      <Legend iconSize={10} layout="vertical" verticalAlign="middle" wrapperStyle={{ left: 10 }} />
    </RadialBarChart>
  );
};

export default ProgressChart;
