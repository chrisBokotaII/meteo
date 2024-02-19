import { Weather } from "../../lib/types/weather";
import "./form.css";

function Form(props: Weather) {
  return (
    <div className="card">
      <h3>{props.name}</h3>
      <p>{props.main}</p>
      <p>{props.description}</p>
      <img
        src={`http://openweathermap.org/img/wn/${props.icon}@2x.png`}
        alt="weather icon"
      />
      <p>{props.temp}°C</p>
      <p>{props.dt_txt}</p>
    </div>
  );
}
export default Form;
