import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Activity } from '../types/activity';
import { activityColors, activityTypes } from '../utils/constants';

interface Props {
  activities: Activity[];
}

export default function ActivityChart({ activities }: Props) {
  const data = Object.entries(activityTypes).map(([key, label]) => {
    const count = activities.filter(a => a.type === key).length;
    const totalDuration = activities
      .filter(a => a.type === key)
      .reduce((sum, act) => sum + act.duration, 0);
    
    return {
      name: label,
      aktivitas: count,
      durasi: Math.round(totalDuration / 60), // Convert to hours
      color: activityColors[key as keyof typeof activityColors]
    };
  });

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data}>
        <XAxis 
          dataKey="name" 
          stroke="#9CA3AF"
          fontSize={12}
          tickLine={false}
        />
        <YAxis 
          stroke="#9CA3AF"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: '#1F2937',
            border: '1px solid rgba(139, 92, 246, 0.1)',
            borderRadius: '0.5rem',
          }}
          labelStyle={{ color: '#E5E7EB' }}
          itemStyle={{ color: '#E5E7EB' }}
        />
        <Bar 
          dataKey="aktivitas" 
          name="Jumlah Aktivitas"
          fill="#8B5CF6"
          radius={[4, 4, 0, 0]}
        />
        <Bar 
          dataKey="durasi" 
          name="Total Jam"
          fill="#4F46E5"
          radius={[4, 4, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}