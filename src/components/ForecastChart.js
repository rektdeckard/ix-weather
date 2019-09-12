import React from 'react';
import { View, ScrollView, TouchableOpacity, Image, Text, StyleSheet } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import moment from 'moment';
import { getImageUri } from '../api/MetaWeather';

const ForecastChart = ({ conditions }) => {

  const data = {
    labels: conditions.map((condition, index) => {
      if (index == 0) {
        return "Today";
      } else if (index == 1) {
        return "Tomorrow";
      }
      return `${moment(condition.applicable_date).format('ddd')} ${moment(condition.applicable_date).format('D')}`;
    }),
    datasets: [
      { data: conditions.map(condition => condition.max_temp) },
      { data: conditions.map(condition => condition.the_temp) },
      { data: conditions.map(condition => condition.min_temp) }
    ]
  };

  const chartConfig = {
    backgroundColor: 'white',
    backgroundGradientFrom: 'white',
    backgroundGradientTo: 'white',
    decimalPlaces: 0, // optional, defaults to 2dp
    color: (opacity = 1) => `rgba(0, 105, 125, ${opacity})`,
    style: {
      borderRadius: 16
    }
  };

  return (
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
      <View style={styles.container}>
        <View style={styles.row}>
          {
            conditions.map((condition, index) => { return (
              <TouchableOpacity style={styles.forecastItem}>
                <Text>{data.labels[index]}</Text>
                <Image
                  style={{ height: 64, width: 64 }}
                  source={{
                    uri: getImageUri(condition.weather_state_abbr)
                  }}
                />
                <Text style={{ fontWeight: "bold" }}>
                  {Math.round(condition.the_temp)}°C
                </Text>
              </TouchableOpacity>
            )})
          }
        </View>
        <LineChart
          data={data}
          chartConfig={chartConfig}
          bezier
          // withInnerLines={false}
          withOuterLines={false}
          // fromZero={true}
          height={200}
          width={700}
          style={{
            marginVertical: 8,
            borderRadius: 16
          }}
        />
      </View>
    </ScrollView>
  );

};

const styles = StyleSheet.create({
  forecastItem: {
    marginLeft: 10,
    padding: 16,
    alignItems: 'center',
  },
  container: {
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingStart: 6
  }
});

export default ForecastChart;