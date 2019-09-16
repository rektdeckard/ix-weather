import axios from "axios";

export default axios.create({
  baseURL: "https://www.metaweather.com",
});

export const getImageUri = weatherSate => {
  return 'https://www.metaweather.com/static/img/weather/png/' + weatherSate + '.png'
};