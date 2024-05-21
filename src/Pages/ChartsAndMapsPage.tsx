import React, { useEffect, useState } from 'react';
import Chart, { ChartConfiguration } from 'chart.js/auto'; // Importing ChartConfiguration
import { useQuery } from '@tanstack/react-query';
import { fetchHistoricalData } from '../Services/api';

const LineGraph: React.FC = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['historicalData'],
    queryFn: fetchHistoricalData,
  });

  const [chart, setChart] = useState<Chart<'line', { labels: string[], datasets: { label: string, data: number[], borderColor: string, fill: boolean }[] }, string> | null>(null); // Adjusted state type

  useEffect(() => {
    if (!data || error || isLoading) return;

    const ctx = document.getElementById('line-chart') as HTMLCanvasElement;
    if (!ctx) return;

    const newChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: Object.keys(data.cases),
        datasets: [
          {
            label: 'Cases',
            data: Object.values(data.cases),
            borderColor: 'rgb(75, 192, 192)',
            fill: false,
          },
          {
            label: 'Deaths',
            data: Object.values(data.deaths),
            borderColor: 'rgb(255, 99, 132)',
            fill: false,
          },
          {
            label: 'Recovered',
            data: Object.values(data.recovered),
            borderColor: 'rgb(54, 162, 235)',
            fill: false,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    });


    return () => {
      newChart.destroy();
    };
  }, [data, error, isLoading]);

  return <canvas id="line-chart" />;
};

export default LineGraph;