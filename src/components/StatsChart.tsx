// components/StatsChart.tsx
'use client';

import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement, // <-- Import ArcElement for Pie charts
  Tooltip,
  Legend,
  Title,
  ChartData,
  ChartOptions,
} from 'chart.js';
import type { FC } from 'react';
import { ChannelStats } from '@/app/api/youtube-stats/route';

// Register the necessary components for the Pie chart
ChartJS.register(
  ArcElement, // <-- Register ArcElement
  Title,
  Tooltip,
  Legend
);

// Define the component's props interface (remains the same)
interface StatsChartProps {
  chartData: ChannelStats;
}

export const StatsChart: FC<StatsChartProps> = ({ chartData }) => {
  // Data structure for the Pie chart
  const data: ChartData<'pie'> = {
    labels: ['Subscribers', 'Total Views', 'Total Videos'],
    datasets: [
      {
        label: 'Count',
        data: [
          Number(chartData.subscribers),
          Number(chartData.views),
          Number(chartData.videos),
        ],
        backgroundColor: [
          'rgba(255, 99, 132, 0.7)',  // Red for Subscribers
          'rgba(255, 255, 0, 0.7)',  // Blue for Views
          'rgba(75, 192, 192, 0.7)',  // Green for Videos
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(75, 192, 192, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  // Options for the Pie chart
  const options: ChartOptions<'pie'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top', // Position the legend at the top
      },
      title: {
        display: true,
        text: 'YouTube Channel Data Distribution 🥧',
        font: {
          size: 18
        }
      },
      tooltip: {
        callbacks: {
          // Display the value and percentage in the tooltip
          label: function (context) {
            const label = context.label || '';
            const value = context.raw as number;
            const total = context.chart.getSortedVisibleDatasetMetas()[0].total;
            const percentage = ((value / total) * 100).toFixed(2);
            return `${label}: ${value} (${percentage}%)`;
          },
        },
      },
    },
  };

  return <Pie data={data} options={options} />;
};