import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { getImageUri } from '../api/MetaWeather';

const CurrentConditions = ({ conditions }) => {
  return (
    <View style={styles.container}>
      <View style={styles.panes}>
        <View style={styles.leftPane}>
          <Text style={{ fontSize: 60, fontWeight: "bold" }}>
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
      <View style={styles.additionalInfo}>
        <Text>Barometric Pressure: {Math.round(conditions.air_pressure)} mbar</Text>
        <Text>Humidity: {conditions.humidity}%</Text>
        <Text>Visibility: {conditions.visibility.toFixed(1)} mi</Text>
        <Text>Wind Speed: {conditions.wind_speed.toFixed(1)} mph {conditions.wind_direction_compass}</Text>
        <Text>Predictability: {conditions.predictability} %</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 24,
  },
  panes: {
    flexDirection: "row",
    marginBottom: 16
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
  },
  additionalInfo: {
    marginBottom: 16
  }
});

export default CurrentConditions;
