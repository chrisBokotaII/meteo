import { useState } from "react";
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import axios from "axios";
import "./App.css";
import Form from "./components/form/Form";
import { Weather } from "./lib/types/weather";

function App() {
  const [weather, setWeather] = useState<Weather[]>([]);
  const [error, setError] = useState("");
  const [temperature, setTemperature] = useState<number[]>([]);
  const [form, setForm] = useState("");
  const [time, setTime] = useState<string[]>([]);

  const fetchWeather = () => {
    axios
      .get(`https://api.openweathermap.org/data/2.5/forecast`, {
        params: {
          q: form,
          appid: "95ba4f49d03f1613f69c0b422ae77717",
        },
      })
      .then((response) => {
        console.log(response.data.list);
        const temp = [];
        const degree = [];
        const time = [];
        for (let i = 0; i < response.data.list.length; i++) {
          console.log(response.data.list[i].main.temp);
          degree.push(response.data.list[i].main.temp);
          setTemperature(degree);
          console.log(response.data.list[i].dt_txt);
          time.push(response.data.list[i].dt_txt);
          setTime(time);

          console.log(response.data.list[i].weather);
          temp.push(response.data.list[i].weather[0]); // Assuming you want the first weather condition for each day
        }
        setWeather(temp);
      })
      .catch((error) => {
        console.log(error);
        setError(error.message);
      });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetchWeather();
  };

  const displayWeather = () => {
    return weather.map((w, index) => (
      <Form key={index} {...w} temp={temperature[index]} dt_txt={time[index]} />
    ));
  };
  if (error) {
    return <h1 color="red">{error}</h1>;
  }

  return (
    <>
      <div className="container">
        <h1>
          Weather Forecast <small>made by Dr. Chris</small>
        </h1>

        <form action="" onSubmit={handleSubmit}>
          <label htmlFor="city">City</label>
          <input type="text" name="city" id="city" onChange={handleChange} />
          <button type="submit">Submit</button>
        </form>
        <div className="displays">{displayWeather()}</div>
      </div>
    </>
  );
}

export default App;
