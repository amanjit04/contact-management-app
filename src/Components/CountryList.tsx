import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

interface Country {
  country: string;
  cases: number;
  deaths: number;
  recovered: number;
  active: number;
  countryInfo: {
    _id: number;
    lat: number;
    long: number;
  };
}

const fetchCountryData = async (): Promise<Country[]> => {
  const { data } = await axios.get('https://disease.sh/v3/covid-19/countries');
  return data;
};

const CountryList: React.FC = () => {
  const { data, error, isLoading } = useQuery<Country[]>({
    queryKey: ['countries'],
    queryFn: fetchCountryData,
    staleTime: 10 * 60 * 1000, 
  });

  if (isLoading) return <div>Loading...</div>;
  if (error instanceof Error) return <div>Error: {error.message}</div>;

  return (
    <div className="bg-gray-100 rounded-lg shadow-md p-4">
      <h3 className="text-xl font-bold mb-2">Country Data</h3>
      <div className="overflow-y-auto max-h-96">
        {data?.map((country) => (
          <div key={country.country} className="mb-2">
            <h4 className="text-lg font-bold">{country.country}</h4>
            <p>Cases: {country.cases.toLocaleString()}</p>
            <p>Active: {country.active.toLocaleString()}</p>
            <p>Recovered: {country.recovered.toLocaleString()}</p>
            <p>Deaths: {country.deaths.toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CountryList;