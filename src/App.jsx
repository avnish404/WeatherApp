import React, { useEffect, useState } from "react";

const App = () => {
  const [data, setData] = useState([]);
  const [city, setCity] = useState("");
  const [displayCity, setDisplaycity] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submit, setSubmit] = useState(true);
  const [opacity, setOpacity] = useState("opacity-100");
  useEffect(() => {
    fetch(
      `http://api.weatherapi.com/v1/current.json?key=09126fecee6f4d97af4174252250104&q=${displayCity}&aqi=no`
    )
      .then((res) => res.json())
      .then((forecast) => setData(forecast))
      .catch((err) => console.log("Error Catching Data", err));
  }, [displayCity]);

  useEffect(() => {
    console.log(data);
    console.log(typeof data); // Check the type of data
  }, [data]);

  const setChange = (e) => {
    setCity(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setDisplaycity(city);
    setIsSubmitted(true);
    setSubmit(false);
    setCity("");

    setTimeout(() => {
      // setIsSubmitted(false)
      setSubmit(true);
    }, 500);

    setTimeout(() => {
      setIsSubmitted(false);
    }, 3000);
  };

  useEffect(() => {
    setOpacity("opacity-0");
    setTimeout(() => {
      setOpacity("opacity-100");
    }, 100);
  }, [displayCity]);
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600 text-black p-4 bg-[url('https://images.pexels.com/photos/391522/pexels-photo-391522.jpeg')] bg-cover bg-center bg-no-repeat)]">
        {/* Search Bar */}
        <div
          className={`text-green-500 text-center text-lg fixed top-5 left-1/2 transform -translate-x-1/2 bg-white px-4 py-2 rounded-md shadow-md  ${
            isSubmitted
              ? "opacity-100 transition-all duration-1000"
              : "opacity-0 transition-all duration-1000"
          }`}
        >
          Form submitted successfully
        </div>
        {/* bg-gray-400/50 backdrop-opacity-100 shadow-2xl shadow-black */}
        <div className="rounded-2xl flex flex-col justify-center items-center min-h-[550px] bg-gray-400/50 backdrop-opacity-100 shadow-2xl shadow-black ">
        <div className="w-full max-w-md bg-white rounded-lg shadow-md p-4 flex items-center">
          <form
            action=""
            onSubmit={handleSubmit}
            className="flex-grow p-2 text-black rounded-l-md outline-none shadow-2xl shadow-black"
          >
            <input
              type="text"
              placeholder="Search city..."
              onChange={setChange}
              value={city}
              name={city}
              className="outline-none"
            />
          </form>

          <button
            className="bg-[#13353D] px-4 py-2 rounded-r-md text-white hover:bg-[#685d56] duration-1000"
            onClick={handleSubmit}
          >
            Search
          </button>
        </div>

        {/* Weather Info */}
        <div className="mt-6 text-center  w-3xl h-full">
          <h1
            key={displayCity} // Forces re-render when city name changes
            className={`text-4xl font-bold transition-all duration-1000  w-full min-h-[50px] flex items-center justify-center ${
              submit ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-5"
            }`}
          >
            {displayCity}
          </h1>
          <p
            className={`text-lg  transition-all duration-1000  w-full min-h-[30px] flex items-center justify-center ${
              submit ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-5"
            }`}
          >
            {data?.location?.localtime !== undefined
              ? data?.location?.localtime
              : ""}
          </p>
          <div
            className={`text-6xl font-bold  transition-all duration-1000  w-full min-h-[55px] flex items-center justify-center ${
              submit ? "opacity-100 translate-x-0" : "opacity-0 translate-x-5"
            }`}
          >
            {data?.current?.temp_c !== undefined
              ? data?.current?.temp_c + "°C"
              : ""}
          </div>
          <p className={`text-lg  transition-all duration-1000  w-full min-h-[25px] flex items-center justify-center ${
              submit ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
            }`}>
            {data?.current?.condition?.text !== undefined
              ? data?.current?.condition?.text
              : ""}
          </p>
        </div>

        {/* Additional Details */}
        <div className="mt-6 grid grid-cols-2 gap-6 text-center">
          <div className="bg-white bg-opacity-20 p-4 rounded-lg text-black">
          <img src="//cdn.weatherapi.com/weather/64x64/day/113.png" alt="" className="h-9 w-9"/>
            <p className="text-lg text-black">Humidity</p>
            <p className={`text-2xl font-bold  transition-all duration-1000  w-full min-h-[50px] flex items-center justify-center ${
              submit ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-5"
            }`}>
              {data?.current?.humidity !== undefined
                ? data?.current?.humidity + "%"
                : ""}
            </p>
          </div>
          <div className="bg-white bg-opacity-20 p-4 rounded-lg shadow-2xl shadow-red">
            <img src="https://cdn-icons-png.flaticon.com/128/1506/1506761.png" alt="" className="h-8 w-8"/>
            <p className="text-lg text-black">Wind Speed</p>
            <p className={`text-2xl font-bold text-black transition-all duration-500  w-full min-h-[50px] flex items-center justify-center ${
    submit ? "opacity-100 translate-x-0" : "opacity-0 translate-x-5"
  }`}>
  {data?.current?.wind_kph ? `${data.current.wind_kph} km/h` : ""}
</p>

            {/* <img src="//cdn.weatherapi.com/weather/64x64/day/113.png" alt="" /> */}
          </div>
        </div>
        </div>
       
      </div>
    </>
  );
};

export default App;
