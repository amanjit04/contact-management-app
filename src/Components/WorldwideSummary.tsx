import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

interface WorldwideData {
  cases: number;
  deaths: number;
  recovered: number;
}

const fetchWorldwideData = async (): Promise<WorldwideData> => {
  const { data } = await axios.get('https://disease.sh/v3/covid-19/all');
  return data;
};

const WorldwideSummary: React.FC = () => {
  const { data, error, isLoading } = useQuery<WorldwideData>({
    queryKey: ['worldwide'],
    queryFn: fetchWorldwideData,
    staleTime: 10 * 60 * 1000, 
  });

  if (isLoading) return <div>Loading...</div>;
  if (error instanceof Error) return <div>Error: {error.message}</div>;

  return (
    <div className="bg-gray-100 rounded-lg shadow-md p-4">
      <h3 className="text-xl font-bold mb-2">Worldwide Summary</h3>
      <div className="flex justify-between items-center mb-4">
        <p>Cases:</p>
        <span className="text-red-500 font-bold">{data?.cases.toLocaleString()}</span>
      </div>
      <div className="flex justify-between items-center mb-4">
        <p>Deaths:</p>
        <span className="text-gray-500 font-bold">{data?.deaths.toLocaleString()}</span>
      </div>
      <div className="flex justify-between items-center">
        <p>Recovered:</p>
        <span className="text-green-500 font-bold">{data?.recovered.toLocaleString()}</span>
      </div>
    </div>
  );
};

export default WorldwideSummary;