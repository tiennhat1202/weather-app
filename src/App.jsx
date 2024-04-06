import { useState } from "react";
import "./App.css";
import { SearchOutlined } from "@ant-design/icons";
import { useStateContext } from "./context";
import BackgroundLayout from "./layouts/background.layout";
import WeatherCard from "./components/card/weather.card";
import MiniCard from "./components/card/mini.card";
function App() {
  const [input, setInput] = useState("");
  const { weather, location, values, place, setPlace } = useStateContext();

  const searchCity = () => {
    setPlace(input);
    setInput("");
  };

  return (
    <div className="w-full h-screen text-white px-8">
      <nav className="w-full p-3 flex justify-between items-center">
        <h1 className="font-bold tracking-wide text-3xl text-black">
          Weather App
        </h1>
        <div className="bg-white w-[15rem] overflow-hidden shadow-2xl rounded flex justify-end p-2 gap-2 items-center">
          <SearchOutlined style={{ fontSize: "24px", color: "#08c" }} />
          <input
            onKeyUp={(e) => {
              if (e.key === "Enter") {
                searchCity();
              }
            }}
            type="text"
            placeholder="Search city for weather"
            className="focus:outline-none w-full text-[#212121] text-lg"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          ></input>
        </div>
      </nav>
      <BackgroundLayout></BackgroundLayout>
      <main className="w-full h-[90%] flex flex-wrap gap-8 py-4 px-[10%] items-center justify-center">
        <WeatherCard
          place={location}
          windspeed={weather.wspd}
          humidity={weather.humidity}
          temperature={weather.temp}
          heatIndex={weather.heatindex}
          iconString={weather.conditions}
          conditions={weather.conditions}
        ></WeatherCard>
        <div className="flex justify-center gap-8 flex-wrap w-[60%]">
          {values?.slice(1, 7).map((curr) => {
            return (
              <MiniCard
                key={curr.datetime}
                time={curr.datetime}
                temp={curr.temp}
                iconString={curr.conditions}
              />
            );
          })}
        </div>
      </main>
    </div>
  );
}

export default App;
