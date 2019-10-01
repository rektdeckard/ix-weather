import axios from "axios";

export default axios.create({
  baseURL: "https://www.metaweather.com",
});

export const getImageUri = weatherState => {
  return `https://www.metaweather.com/static/img/weather/png/${weatherState}.png`
};