import {useEffect, useState} from 'react';
import {PermissionsAndroid} from 'react-native';
import MetaWeather from '../api/MetaWeather';
import Geolocation from '@react-native-community/geolocation';

export default () => {
  const [location, setLocation] = useState(null);
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');

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
      const response = await MetaWeather.get('/api/location/search', {params});
      setResults(response.data);
    } catch (err) {
      setError('Could not connect to MetaWeather');
    }
  };

  // Retrieve the device coordinates make the API call with them
  const getLocationAsync = async () => {
    try {
      // Requests location permission if not already granted
      Geolocation.getCurrentPosition(
        info => {
          let coords = info.coords;
          setLocation(coords);
          makeRequest({lattlong: `${coords.latitude},${coords.longitude}`});
        },
        () => {
          // On permission denied, make a query with default location
          // setError("Location permission was denied. Try making a search.");
          makeRequest({lattlong: '0,0'});
        },
      );
    } catch (err) {
      setError(err.message);
    }
  };

  // Get device location once when the component is created.
  useEffect(() => {
    getLocationAsync();
  }, []);

  return [searchApi, results, error];
};
