
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { BudgetBreakdown } from '../types';

interface BudgetChartsProps {
  data: BudgetBreakdown;
}

export const BudgetCharts: React.FC<BudgetChartsProps> = ({ data }) => {
  const chartData = [
    { name: 'Transport', value: data.transport, color: '#f97316' },
    { name: 'Stay', value: data.stay, color: '#3b82f6' },
    { name: 'Activities', value: data.activities, color: '#10b981' },
    { name: 'Meals', value: data.meals, color: '#f59e0b' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-[300px]">
      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
        <h3 className="text-lg font-semibold mb-4 text-slate-800">Cost Breakdown</h3>
        <ResponsiveContainer width="100%" height="80%">
          <PieChart>
            <Pie
              data={chartData}
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
            <Legend verticalAlign="bottom" height={36}/>
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
        <h3 className="text-lg font-semibold mb-4 text-slate-800">Expenses by Category</h3>
        <ResponsiveContainer width="100%" height="80%">
          <BarChart data={chartData}>
            <XAxis dataKey="name" hide />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" radius={[4, 4, 0, 0]}>
              {chartData.map((entry, index) => (
                <Cell key={`cell-bar-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
