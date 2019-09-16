import { useEffect, useState } from "react";
import { PermissionsAndroid } from 'react-native';
import MetaWeather from "../api/MetaWeather";
import Geolocation from '@react-native-community/geolocation';

export default () => {
  const [location, setLocation] = useState(null)
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");

  /**
   * Poll the MetaWeather API for weather info based on device location or user query
   * @param {string} query optional city/placename
   */
  const searchApi = async query => {
    setError(null);
    const params = {};
    // If no search query provided, make API request with device location
    if (query) {
      params.query = query;
      makeRequest(params);
    } else {  
      getLocationAsync();
    } 
    
  };


  const makeRequest = async params => {
    try {
      const response = await MetaWeather.get("/api/location/search", { params });
      setResults(response.data);
    } catch (err) {
      setError("Could not connect to MetaWeather");
    }
  }

  const getLocationAsync = async () => {
    try {

      // Request permission to get the device location
      let permitted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, 
        {
          title: 'Request Location Permission',
          message:
            'iX Weather would like to use your location ' +
            'to provide weather data for nearby cities.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        });

      // Get permission if on iOS  
      if (!permitted === PermissionsAndroid.RESULTS.GRANTED) {
        Geolocation.requestAuthorization();
        permitted = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
        if (!permitted === PermissionsAndroid.RESULTS.GRANTED) {
          setError('Permission to access location was denied');
          return;
        }
      }
      
      // Retrieve the decive coordinates make the API call with them
      Geolocation.getCurrentPosition(info => {
        let coords = info.coords;
        setLocation(coords);
        makeRequest({ lattlong: `${coords.latitude},${coords.longitude}` });
      });
    } catch (err) {
      console.warn(err);
    } 

  };
  
  // Get device location once when the component is created.
  useEffect(() => {
    getLocationAsync();
  }, []);

  return [searchApi, results, error];
};
