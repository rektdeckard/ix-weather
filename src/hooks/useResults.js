import { useEffect, useState } from "react";
import metaWeather from "../api/metaWeather";
import * as Location from 'expo-location';

export default () => {
  const [location, setLocation] = useState(null)
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");

  const searchApi = async query => {
    const params = {};
    // If no search query provided, make API request with device location
    if (!query || !query.length) {
      // getLocationAsync();
      params.lattlong = '0,0';
      testLocation();
    } else {
      params.query = query;
    }

    try {
      const response = await metaWeather.get("/api/location/search", {
        params
      });
      setResults(response.data);
    } catch (err) {
      setError("Something went wrong");
    }
  };

  const testLocation = () => {
    let loc = Location.hasServicesEnabledAsync();
    console.log(loc);
    let perms = Location.requestPermissionsAsync();
    console.log(perms);
    getLocationAsync();

  }
  
  const getLocationAsync = async () => {
    let providerStatus = await Location.getProviderStatusAsync();
    if (!providerStatus.locationServicesEnabled) {
      setError("Location Services Disabled");
      return;
    }

    let { status } = await Location.requestPermissionsAsync();
    if (status !== 'granted') {
     setError("Permission to access location was denied");
     return
    }

    let location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced, maximumAge: 300000 });
    if (location) {
      setLocation(location);
      console.log(location);
    }
  };


  const getLocation = async () => await Location.getCurrentPositionAsync({ accuracy: 'Accuracy.Balanced', maximumAge: 300000});

  // Call searchApi ONCE when the component first renders, with supplied default term.
  // If search is called again, use the supplied
  useEffect(() => {
    searchApi(null);
  }, []);

  return [searchApi, results, error];
};
