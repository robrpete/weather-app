"use client"
import axios from 'axios';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Day from './components/Day';
import SearchResult from './components/SearchResult';
import {type WeatherData} from '../../weatherResType';

export default function Home() {
  const [searched, setSearched] = useState("");
  const [ searchResults, setSearchResults] = useState(null);
  const [ selectedCityData, setSeletedCityData] = useState(null);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  let cityKey = '';
  
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearched(event.target.value);
  };

  const handleSearchCity = async () => {
    try {
      const response = await axios.get(
        'http://dataservice.accuweather.com/locations/v1/cities/autocomplete',
        {
          params: {
            apikey: process.env.APIkey,
            q: searched,
          },
        }
      );
      setSearchResults(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  const handleTestSelectCity = async (city: string, state: string) => {
    searchResults.map((r) => {
      if(city === r.LocalizedName && state === r.AdministrativeArea.ID){
        setSeletedCityData(r)//sets 
        console.log(selectedCityData)//but is printed null bc bs with async state huh.. works tho
      }
    })
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${selectedCityData.Key}`,
          {
            params: {
              apikey: process.env.APIkey,
            },
          }
        );
        setWeatherData(response.data as WeatherData);
      } catch (error) {
        console.error(error);
      }
    };
    if(selectedCityData){
      fetchData()
    }
  }, [selectedCityData]);

  return (
    <main className="flex min-h-screen justify-center mt-12 overflow-hidden">
      <div className="flex w-1/2 justify-center">
        <div className="flex flex-col items-center">
          <h1 className='text-center text-2xl mb-4'>WEATHER</h1>
          <div>
            <input
              type="text"
              name="search"
              id="search"
              onChange={handleSearchChange}
              className="bg-slate-800 px-2 py-1 rounded-l-md border border-white"
            />
            <button className="bg-white text-slate-800 p-1 rounded-r-md border border-white" onClick={handleSearchCity}>
              Search
            </button>
            <p>Results for: {searched}</p>
          </div>
          <div>
            <div>
            <div className='flex flex-wrap justify-center'>
            { searchResults && searchResults.map((r) => (<SearchResult key={r.Key} City={r.LocalizedName} State={r.AdministrativeArea.ID} onClick={()=> handleTestSelectCity(r.LocalizedName, r.AdministrativeArea.ID)}/>))}
            
            </div>
            {selectedCityData && <p className="font-semibold text-3xl text-center pt-4">{selectedCityData.LocalizedName}, {selectedCityData.AdministrativeArea.ID}</p>}
            {weatherData && 
              <div>
              <p className="text-center">Today: {weatherData.Headline.Text}</p>
              <div className="flex flex-wrap justify-center">
              {weatherData.DailyForecasts.map((day) => (
                <Day
                  key={day.EpochDate}
                  day={day.Date}
                  temp={day.Temperature.Maximum.Value}
                  minTemp={day.Temperature.Minimum.Value}
                  dayWeather={day.Day.IconPhrase}
                  overnight={day.Night.IconPhrase}
                />
              ))}
              </div>
              </div>
            }
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
