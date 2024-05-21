import React from 'react';
import { Line } from 'react-chartjs-2';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

interface HistoricalData {
  cases: { [date: string]: number };
  deaths: { [date: string]: number };
  recovered: { [date: string]: number };
}

const fetchHistoricalData = async (): Promise<HistoricalData> => {
  const { data } = await axios.get('https://disease.sh/v3/covid-19/historical/all?lastdays=all');
  return data;
};

const LineGraph: React.FC = () => {
  const { data, error, isLoading } = useQuery<HistoricalData>({
    queryKey: ['historical'],
    queryFn: fetchHistoricalData,
    staleTime: 10 * 60 * 1000, 
  });

  if (isLoading) return <div>Loading...</div>;
  if (error instanceof Error) return <div>Error loading data: {error.message}</div>;

  const chartData = {
    labels: data ? Object.keys(data.cases) : [],
    datasets: [
      {
        label: 'Cases',
        data: data ? Object.values(data.cases) : [],
        borderColor: 'rgb(75, 192, 192)',
        fill: false,
      },
      {
        label: 'Deaths',
        data: data ? Object.values(data.deaths) : [],
        borderColor: 'rgb(255, 99, 132)',
        fill: false,
      },
      {
        label: 'Recovered',
        data: data ? Object.values(data.recovered) : [],
        borderColor: 'rgb(54, 162, 235)',
        fill: false,
      },
    ],
  };

  return <Line data={chartData} />;
};

export default LineGraph;