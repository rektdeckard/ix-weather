import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { getImageUri } from '../api/metaWeather';

const CurrentConditions = ({ conditions }) => {
  return (
    <View style={styles.container}>
      <View style={styles.panes}>
        {/* <Text>{conditions.weather_state_name}</Text> */}
        <View style={styles.leftPane}>
          <Text style={{ fontSize: 48, fontWeight: "bold" }}>
            {Math.round(conditions.the_temp)}°C
          </Text>
          <Text>HIGH {Math.round(conditions.max_temp)}°C / LOW {Math.round(conditions.min_temp)}°C</Text>
        </View>
        <View style={styles.rightPane}>
          <Image
            style={{ height: 128, width: 128 }}
            source={{ uri: getImageUri(conditions.weather_state_abbr) }}
          />
          <Text>{conditions.weather_state_name}</Text>
        </View>
      </View>
      <Text>Air Pressure: {Math.round(conditions.air_pressure)} mBar</Text>
      <Text>Humidity: {conditions.humidity}%</Text>
      <Text>Visibility: {Math.round(conditions.visibility)}%</Text>
      <Text>Wind Speed: {Math.round(conditions.wind_speed)} km/h {conditions.wind_direction_compass}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 16
  },
  panes: {
    flexDirection: "row"
  },
  leftPane: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  rightPane: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default CurrentConditions;
