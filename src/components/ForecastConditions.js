import React from "react";
import { View, Text, Image, FlatList, StyleSheet } from "react-native";
import { getImageUri } from "../api/MetaWeather";
import moment from 'moment';

const ForecastConditions = ({ conditions }) => {
  return (
    <>
      <FlatList
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        data={conditions}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={{ paddingEnd: 16 }}
        renderItem={({ item, index }) => {
          return (
            <View style={styles.forecastItem}>
              { index == 0 ? <Text>Today</Text>
                : index == 1 ? <Text>Tomorrow</Text>
                : <Text>{moment(item.applicable_date).format('ddd')}</Text>
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
            </View>
          );
        }}
      />
    </>
  );
};

const styles = StyleSheet.create({
  forecastItem: {
    marginLeft: 16,
    alignItems: 'center'
  }
});

export default ForecastConditions;
