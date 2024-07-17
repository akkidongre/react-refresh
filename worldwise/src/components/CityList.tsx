import { useState, useEffect } from 'react';
import styles from './CityList.module.css';
import { API_URL } from '../App';
import Spinner from './Spinner';
import CityItem from './CityItem';
import Message from './Message';

export interface City {
  "cityName": string,
  "country": string,
  "emoji": any,
  "date": string,
  "notes": string,
  "position": {
    "lat": number,
    "lng": number
  },
  "id": number
}

export default function CityList() {
  const [cities, setCities] = useState<City[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchCities() {
      try {
        setIsLoading(true);
        const res = await fetch(`${API_URL}/cities`);
        const data = await res.json();
        setCities(data);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchCities();
  }, []);

  if (isLoading) {
    return <Spinner />;
  }

  if (cities.length === 0) {
    return <Message message="Add your first city by clicking on the map" />
  }

  return (
    <ul className={styles.cityList}>
      {cities.map((city) => <CityItem key={city.id} city={city} />)}
    </ul>
  )
}
