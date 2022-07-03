import Axios from "./axios";

// I would normally put this in an enviornment secret, but
// it wasn't easily able to be done on code sandbox
const KEY = "8d85f498b43e7ce143339c7823946256";

const getCurrentWeather = (lat, lon) =>
  Axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
    params: {
      lat,
      lon,
      appid: KEY
    }
  }).then((res) => res.data);

export const API = {
  getCurrentWeather
};
