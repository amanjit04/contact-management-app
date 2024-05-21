import axios from 'axios';

export const fetchWorldwideData = async () => {
  const { data } = await axios.get('https://disease.sh/v3/covid-19/all');
  return data;
};

export const fetchCountryData = async () => {
  const { data } = await axios.get('https://disease.sh/v3/covid-19/countries');
  return data;
};

export const fetchHistoricalData = async () => {
  const { data } = await axios.get('https://disease.sh/v3/covid-19/historical/all?lastdays=all');
  return data;
};
