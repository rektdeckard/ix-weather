import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, StyleSheet, Linking } from "react-native";
import * as Progress from "react-native-progress";
import MetaWeather from "../api/MetaWeather";
import CurrentConditions from "../components/CurrentConditions";
import ForecastConditions from "../components/ForecastConditions";
import ErrorItem from "../components/ErrorItem";

/**
 * Detail screen for current and forecasted weather of a city
 * @param {NavigationContainer} navigation contains a city title and ID passed as additional params from LocationListScreen
 */
const DetailScreen = ({ navigation }) => {
  const id = navigation.getParam("id");
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const getResult = async id => {
    try {
      const response = await MetaWeather.get(`/api/location/${id}`);
      setResult(response.data);
    } catch (err) {
      setError(err.message);
    }
  };

  // Fetch data once on mount, and only again if Connectivity Status changes
  useEffect(() => {
    getResult(id);
  }, [error]);

  // On fetch error, display the error
  if (error) {
    return (
      <ErrorItem message={error} />
    );
  }

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
 * Set the toolbar title to the name of the city, passed as navigation param
 */
DetailScreen.navigationOptions = ({ navigation }) => ({
  title: navigation.getParam("title")
});

const styles = StyleSheet.create({
  progress: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});

export default DetailScreen;
