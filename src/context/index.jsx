import { useContext, createContext, useState, useEffect } from "react";

import axios from "axios";

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  const [weather, setWeather] = useState({});
  const [values, setValues] = useState([]);
  const [place, setPlace] = useState("Washington,DC,USA");
  const [location, setLocation] = useState("");

  const fetchWeather = async () => {
    const options = {
      method: "GET",
      url: import.meta.env.REACT_APP_API_URL,
      params: {
        aggregateHours: "24",
        location: place,
        contentType: "json",
        unitGroup: "metric",
        shortColumnNames: "0",
      },
      headers: {
        "X-RapidAPI-Key": import.meta.env.REACT_APP_API_KEY,
        "X-RapidAPI-Host": import.meta.env.REACT_APP_API_HOST,
      },
    };
    try {
      const response = await axios.request(options);
      console.log(response.data);
      const thisData = Object.values(response.data.locations)[0];
      setLocation(thisData.address);
      setValues(thisData.values);
      setWeather(thisData.values[0]);
      console.log("Checking weather:", thisData.values[0]);
    } catch (error) {
      console.error(error);
      alert("This place does not exist!");
    }
  };

  useEffect(() => {
    fetchWeather();
  }, [place]);

  useEffect(() => {
    console.log(values);
  }, [values]);

  return (
    <StateContext.Provider
      value={{
        weather,
        setPlace,
        values,
        location,
        place,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
