import React from 'react';
import '../styling/PollingAccuracy.css'
import { PieChart, Pie, Cell } from 'recharts';

const data = [
  { name: 'Benar', value: 75 },
  { name: 'Salah', value: 25 },
];

const COLORS = ['#0088FE', '#FF8042'];

const PollingAccuracy = () => {
  return (
    <PieChart width={200} height={200}>
      <Pie
        data={data}
        cx={100}
        cy={100}
        innerRadius={50}
        outerRadius={80}
        fill="#8884d8"
        paddingAngle={5}
        dataKey="value"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
    </PieChart>
  );
};

export default PollingAccuracy;
