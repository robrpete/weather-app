import { NextPage } from "next"
import { useEffect, useState } from 'react';

const NameOfDay = {
  0: 'Sunday',
  1: 'Monday',
  2: 'Tuesday',
  3: 'Wed',
  4: 'Thursday',
  5: 'Friday',
  6: 'Saturday',
}

const Day: NextPage = ({day, temp, minTemp, dayWeather, overnight}) => {
    const [dayOfWeek, setDayOfWeek] = useState(0);
    useEffect(() => {
      const getDayOfWeek = () => {
        const d = new Date(day)
        setDayOfWeek(d.getDay())
        day = dayOfWeek
        
      }
      if(day){
        getDayOfWeek()
      }
    },[day])
    
    return (
      <div className="bg-[#60a5fa88] flex h-24 w-80 rounded-lg p-1 m-2">
        <div className="flex w-3/4 rounded-l-lg border-r-2 border-[#FFFFFF55]">
          <div className="flex flex-col justify-evenly pl-2">
            <p className="font-semibold text-lg">{NameOfDay[dayOfWeek]}</p>  
            <p className="font-bold text-2xl">{temp}&deg;</p>
            <p>{dayWeather}</p>
          </div>
        </div>
        <div className="flex flex-col justify-evenly bg-[#00000044] w-1/4 text-sm text-center rounded-r-lg">
          <p>Overnight</p>
          <div>
          <p>{overnight}</p>
          <p>{minTemp}</p>
          </div>
        </div>
      </div>
    )
  }

export default Day;