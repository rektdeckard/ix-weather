import React, { useState } from "react";
import { Text, Image, FlatList, StyleSheet } from "react-native";
import { TouchableOpacity, ScrollView } from "react-native-gesture-handler";
import { getImageUri } from "../api/MetaWeather";
import moment from 'moment';
import ForecastChart from "./ForecastChart";

const ForecastConditions = ({ conditions }) => {
  return (
    <>
      <FlatList
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        data={conditions.consolidated_weather}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={{ paddingStart: 8, paddingEnd: 16 }}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity style={styles.forecastItem}
              onPress={() => console.log(item.applicable_date)}>
              { index == 0 ? <Text>Today</Text>
                : index == 1 ? <Text>Tomorrow</Text>
                : <Text>{moment(item.applicable_date).format('ddd')} {moment(item.applicable_date).format('D')}</Text>
              }
              <Image
                style={{ height: 64, width: 64 }}
                source={{
                  uri: getImageUri(item.weather_state_abbr)
                }}
              />
              <Text style={{ fontWeight: "bold" }}>
                {Math.round(item.the_temp)}°C
              </Text>
            </TouchableOpacity>
          );
        }}
      />
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <ForecastChart conditions={conditions.consolidated_weather} />
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  forecastItem: {
    marginLeft: 8,
    padding: 16,
    alignItems: 'center',
  }
});

export default ForecastConditions;
