"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import axios from "axios";

const WeatherPage = () => {
  const [weatherMetric, setWeatherMetric] = useState("Celcius");
  const [currentWeather, setCurrentWeather] = useState(null);


  function getUserLocation() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        function(position) {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          console.log('Latitude:', latitude);
          console.log('Longitude:', longitude);
          // Now you can use these coordinates to make the API call
          fetchWeatherData(latitude, longitude);
        },
        function(error) {
          console.error("Error getting user's geolocation:", error.message);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }


  function fetchWeatherData(latitude, longitude) {
    const apiKey = process.env.OPEN_WEATHER_API; 
    console.log("open weather api: ", apiKey)
    const apiUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&exclude={part}&appid=${apiKey}`;
  
    axios.get(apiUrl)
      .then(response => {
        // Handle API response data
        console.log('Weather data:', response.data);
        setCurrentWeather(response.data);
      })
      .catch(error => {
        console.error('Error fetching weather data:', error);
      });
  }


  getUserLocation();


  const date = new Date();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();

  let currentDate = `${day}-${month}-${year}`;

  let weatherInFarenheit = 80;

  let weatherInCelcius = (((weatherInFarenheit - 32) * 5) / 9).toFixed(2);

  const getTextToShow = (weather) => {
    let textToShow;
    if (weather >= 40) {
      textToShow = "It's hot af boi";
    } else if (weather >= 25) {
      textToShow = "Not Ideal, but bearable";
    } else if (weather >= 18) {
      textToShow = "Ideal for a run";
    } else if (weather >= 10) {
      textToShow = "Get your sweater, sweater weather";
    } else {
      textToShow = "It's cold af boi";
    }
  
    return textToShow;
  }
  


  console.log("text to show: ", getTextToShow(weatherInCelcius))
 
  return (
    <div className="flex flex-col gap-8 items-center justify-between p-4 h-full">
      <div className="flex justify-between items-center w-full">
        <div className="hidden md:block">{currentDate}</div>
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Unit of Temperature</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Weather Metric</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup
                value={weatherMetric}
                onValueChange={setWeatherMetric}
              >
                <DropdownMenuRadioItem value="Celcius">
                  Celcius
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="Farentheit">
                  Farentheit
                </DropdownMenuRadioItem>
                {/* <DropdownMenuRadioItem value="right">Right</DropdownMenuRadioItem> */}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className=" font-bold text-6xl">
        {" "}
        {weatherMetric === "Celcius"
          ? `${weatherInCelcius}\u00B0C`
          : `${weatherInFarenheit}\u00B0F`}
      </div>
      <div className="text-lg">
        {getTextToShow(weatherInCelcius)}
      </div>
    </div>
  );
};

export default WeatherPage;
