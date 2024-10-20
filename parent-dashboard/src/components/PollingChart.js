import React from 'react';
import '../styling/PollingAccuracy.css'
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const data = [
  { name: 'Fisika', value: 15 },
  { name: 'Matematika', value: 20 },
];

const PollingChart = () => {
  return (
    <BarChart width={150} height={200} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  );
};

export default PollingChart;
