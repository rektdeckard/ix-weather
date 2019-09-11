import { useEffect, useState } from "react";
import MetaWeather from "../api/MetaWeather";
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';

export default () => {
  const [location, setLocation] = useState(null)
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");

  const searchApi = async query => {
    const params = {};
    // If no search query provided, make API request with device location
    if (!query || !query.length) {
      // getLocationAsync();
      let loc = await getLocationAsync();
      params.lattlong = `${loc.coords.latitude},${loc.coords.longitude}`;
    } else {
      params.query = query;
    }

    try {
      const response = await MetaWeather.get("/api/location/search", { params });
      setResults(response.data);
    } catch (err) {
      setError("Something went wrong");
    }
  };

  getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      setError('Permission to access location was denied');
    }

    let location = await Location.getCurrentPositionAsync({});
    setLocation({ location });
    console.log(location);
    return location;
  };
  
  // const getLocationAsync = async () => {
  //   let providerStatus = await Location.getProviderStatusAsync();
  //   if (!providerStatus.locationServicesEnabled) {
  //     setError("Location Services Disabled");
  //     return;
  //   }

  //   let { status } = await Location.requestPermissionsAsync();
  //   if (status !== 'granted') {
  //    setError("Permission to access location was denied");
  //    return
  //   }

  //   let location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced, maximumAge: 300000 });
  //   if (location.coords) {
  //     setLocation(location.coords);
  //     console.log(location.coords);
  //   }
  // };

  // Call searchApi ONCE when the component first renders, with supplied default term.
  // If search is called again, use the supplied
  useEffect(() => {
    searchApi(null);
  }, []);

  return [searchApi, results, error];
};
