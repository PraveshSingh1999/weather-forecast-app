import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MapComponent from "./MapComponent";

const InfoPage = () => {
  const { gettingCityCoordinates } = useParams();
  // const [cityCoordinates, setCityCoordinates] = useState({})

  const [weatherData, setWeatherData] = useState({});
  const [loading, setLoading] = useState(false)

  const lat = Number(gettingCityCoordinates?.split(",")[0]);
  const lon = Number(gettingCityCoordinates?.split(",")[1]);

  console.log(lat, lon);
  console.log(weatherData);
  console.log(
    "getting: ",
    gettingCityCoordinates?.split(" ")[1].split(",").join("/")
  );

  useEffect(() => {
    setLoading(true)
    let ignore = false;
    async function fetchData() {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=e9935208d8fd3bc8c7746fee02a95b2d`
        );
        const data = await response.json();

        if (!ignore) {
          setWeatherData({ ...data });
          setLoading(false)
        }
      } catch (error) {
        console.log("Error While Fetching data: ", error);
      }
    }

    fetchData();

    return () => {
      ignore = true;
    };
  }, []);

  //   const changeTimeStamp = (time) => {
  //     const dateObject = new Date(time * 1000);
  //     return dateObject.toLocaleTimeString();
  //   };

  const changeTimeStamp = (time) => {
    console.log("inside change time stamp");
    const date = new Date(time * 1000);
    const cityLocalDate = date.toLocaleString("en-US", {
      timeZone: gettingCityCoordinates?.split(" ")[1].split(",").join("/"),
    });
    return cityLocalDate.split(",")[1];
  };


  const [isUnitChange, setIsUnitChange] = useState(false)

  const handleCheckbox = (e) => {
    setIsUnitChange(e.target.checked)
  }

  return (
    <div className="w-screen bg-gray-100 min-h-screen flex justify-center">
      <div className="w-5/6 flex flex-col justify-center items-center">

        {/* loading spinner */}
        {
            loading && (<div className="flex justify-center items-center h-screen">
            <div className="border-dashed border-4 border-t-4 border-indigo-500 rounded-full w-12 h-12 animate-spin"></div>
            <span className="px-2 font-montserrat text-xl font-light text-indigo-500">Processing...</span>
         </div>)
        }
        {/* end of loading spinner */}

        {weatherData.list && (
          <h1 className="p-6 text-center uppercase text-2xl text-blue-700 font-palanquin whitespace-break-spaces">
            Weather Information of{" "}
            <span className="text-4xl text-gray-700 font-medium block">
              {weatherData.city && weatherData.city.name}
            </span>
          </h1>
        )}

        {weatherData.list && (
          <div className="bg-gray-200 shadow flex flex-col max-w-md">
            <div className="py-2 px-6 flex">
              <div className="p-2 flex flex-col justify-center items-center">
                <img
                  src="/images/sunrise.png"
                  alt="sunrise"
                  className="w-2/6"
                />
                <p className="pt-2 text-center text-md font-light font-montserrat">
                  {changeTimeStamp(
                    weatherData.city && weatherData.city.sunrise
                  )}
                </p>
              </div>

              <div className="p-2 flex flex-col justify-center items-center">
                <img src="/images/sunset.png" alt="sunrise" className="w-2/6" />
                <p className="pt-2 text-md font-light font-montserrat">
                  {changeTimeStamp(weatherData.city && weatherData.city.sunset)}
                </p>
              </div>
            </div>

            <div className="w-full flex gap-2 p-2">
              <label htmlFor="convert" className="font-montserrat font-light">Change Unit</label>
              <input type="checkbox" name="" id="convert" className="accent-blue-700" onChange={handleCheckbox} />
            </div>

            {/* Weather card */}
            <div className="p-4 max-w-xs mx-auto">
              <div className="bg-yellow-100 border border-gray-700 rounded-md">
                <p className="px-1 font-medium text-gray-500 font-montserrat border-b-2 border-blue-800">
                  Date :{" "}
                  {weatherData.list &&
                    weatherData.list[0].dt_txt
                      .split(" ")[0]
                      .trim()
                      .split("-")
                      .reverse()
                      .join("-")}
                </p>

                {/* <div className='border-b-2 border-blue-800'></div> */}

                <p className="px-1 font-light font-montserrat">
                  Temperature:{" "}
                  {
                   isUnitChange ?
                   `${(weatherData.list && weatherData.list[0].main.temp - 273.15).toFixed()}°C`:
                    `${weatherData.list && weatherData.list[0].main.temp}K` 
                  }
                </p>
                <p className="px-1 font-light font-montserrat">
                  Feels Like:{" "}
                  {
                   isUnitChange ?
                   `${(weatherData.list && weatherData.list[0].main.feels_like - 273.15).toFixed()}°C`:
                    `${weatherData.list && weatherData.list[0].main.feels_like}K` 
                  }
                </p>

                <div className="border-b-2 border-blue-800"></div>

                <p className="px-1 font-light font-montserrat">
                  Min Temperature:{" "}
                  {
                   isUnitChange ?
                   `${(weatherData.list && weatherData.list[0].main.temp_min - 273.15).toFixed()}°C`:
                    `${weatherData.list && weatherData.list[0].main.temp_min}K` 
                  }
                </p>
                <p className="px-1 font-light font-montserrat">
                  Max Temperature:{" "}
                  {
                   isUnitChange ?
                   `${(weatherData.list && weatherData.list[0].main.temp_max - 273.15).toFixed()}°C`:
                    `${weatherData.list && weatherData.list[0].main.temp_max}K` 
                  }
                </p>

                <div className="border-b-2 border-blue-800"></div>

                <p className="px-1 font-light font-montserrat">
                  Humidity:{" "}
                  {weatherData.list && weatherData.list[0].main.humidity}%
                </p>

                <div className="border-b-2 border-blue-800"></div>

                <p className="px-1 font-light font-montserrat">
                  Pressure:{" "}
                  {weatherData.list && weatherData.list[0].main.pressure} hPa
                </p>
                <p className="px-1 font-light font-montserrat">
                  Sea Level Pressure:{" "}
                  {weatherData.list && weatherData.list[0].main.sea_level} hPa
                </p>
                <p className="px-1 font-light font-montserrat">
                  Ground Level Pressure:{" "}
                  {weatherData.list && weatherData.list[0].main.grnd_level} hPa
                </p>

                <div className="border-b-2 border-blue-800"></div>

                <p className="px-1 font-light font-montserrat">
                Temperature Change Since Forecast:{" "}
                  {weatherData.list && weatherData.list[0].main.temp_kf} K
                </p>

                <div className="border-b-2 border-blue-800"></div>

                <div className="p-2 flex ">
                  <img
                    src={`/images/${
                      weatherData.list && weatherData.list[0].weather[0].icon
                    }.png`}
                    alt={
                      weatherData.list && weatherData.list[0].weather[0].main
                    }
                    className="w-1/4 h-1/4 py-2"
                  />
                  <div className="px-2 py-1">
                    <p className="px-1 font-medium font-montserrat">
                      {weatherData.list && weatherData.list[0].weather[0].main}
                    </p>
                    <p className="px-1 font-light font-montserrat text-sm">
                      Description:{" "}
                      <span className="block ml-6 text-lg font-medium">
                        {weatherData.list &&
                          weatherData.list[0].weather[0].description}
                      </span>
                    </p>
                  </div>
                </div>

                <div className="border-b-2 border-blue-800"></div>

                <p className="px-1 font-medium font-montserrat">
                  Wind Information:
                </p>
                <div className="px-3">
                  <p className="px-1 font-light font-montserrat">
                    Speed: {weatherData.list && weatherData.list[0].wind.speed}{" "}
                    m/s
                  </p>
                  <p className="px-1 font-light font-montserrat">
                    Wind Direction:{" "}
                    {weatherData.list && weatherData.list[0].wind.deg} deg
                  </p>
                  <p className="px-1 font-light font-montserrat">
                    Gust: {weatherData.list && weatherData.list[0].wind.gust}{" "}
                    m/s
                  </p>
                </div>

                <div className="border-b-2 border-blue-800"></div>

                <p className="px-1 font-light font-montserrat">
                  Visibility:{" "}
                  {weatherData.list && weatherData.list[0].visibility} meters
                </p>
                <p className="px-1 font-light font-montserrat">
                  Rain Probability:{" "}
                  {weatherData.list && (weatherData.list[0].pop * 100).toFixed()} %{" "}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InfoPage;

// , (weatherData.city && weatherData.city.timezone)/60
