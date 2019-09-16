import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Linking
} from "react-native";
import * as Progress from "react-native-progress";
import MetaWeather from "../api/MetaWeather";
import CurrentConditions from "../components/CurrentConditions";
import ForecastConditions from "../components/ForecastConditions";
import ErrorItem from "../components/ErrorItem";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Context } from "../context/FavoritesContext";

/**
 * Detail screen for current and forecasted weather of a city
 * @param {NavigationContainer} navigation contains a city title and ID passed as additional params from LocationListScreen
 */
const DetailScreen = ({ navigation }) => {
  const id = navigation.getParam("id");
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [favorite, setFavorite] = useState(false);
  const { state, addFavorite, deleteFavorite } = useContext(Context);

  // Fetch location weather data asynchronously using WOEID
  const getResult = async id => {
    try {
      const response = await MetaWeather.get(`/api/location/${id}`);
      setResult(response.data);
    } catch (err) {
      setError(err.message);
    }
  };

  // console.log(state);

  const getFavorite = id => {
    navigation.setParams({
      toolbar: {
        title: navigation.getParam("title"),
        headerRight: (
          <TouchableOpacity
            style={{ padding: 16 }}
            onPress={() => {
              favorite ? deleteFavorite(id) : addFavorite(id);
            }}
          >
            <Icon
              name={favorite ? "bookmark" : "bookmark-border"}
              size={30}
              color="white"
            />
          </TouchableOpacity>
        )
      }
    });
  };

  // Perform fetch once on mount, and only again if Connectivity Status changes
  useEffect(() => {
    getResult(id);
    addFavorite({ title: "New York", woeid: 2459115 });
    getFavorite(id);
  }, []);

  // On error fetching data, display the error
  if (error) {
    return <ErrorItem message={error} />;
  }

  // While lodaing results, ProgressBar
  if (!result) {
    return (
      <View style={styles.progress}>
        <Progress.Bar
          indeterminate={true}
          useNativeDriver={true}
          color={"gray"}
          height={8}
          width={256}
        />
      </View>
    );
  }

  return (
    <ScrollView>
      <CurrentConditions conditions={result.consolidated_weather[0]} />
      <ForecastConditions conditions={result.consolidated_weather} />
      <View
        style={{ flexDirection: "row", justifyContent: "center", margin: 24 }}
      >
        <Text style={{ fontSize: 12, color: "gray" }}>
          Weather data provided by{" "}
        </Text>
        <Text
          style={{ fontSize: 12, color: "#00697D" }}
          onPress={() => Linking.openURL("https://www.metaweather.com/")}
        >
          MetaWeather
        </Text>
      </View>
    </ScrollView>
  );
};

/**
 * Set the toolbar title to the name of the city, passed as navigation param.
 * Add the 'Bookmark' button to the toolbar.
 */
DetailScreen.navigationOptions = ({ navigation }) => {
  const toolbar = navigation.getParam("toolbar");
  return (
    toolbar || {
      title: navigation.getParam("title"),
      headerRight: (
        <TouchableOpacity style={{ padding: 16 }}>
          <Icon name="bookmark-border" size={30} color="white" />
        </TouchableOpacity>
      )
    }
  );
};

const styles = StyleSheet.create({
  progress: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});

export default DetailScreen;
