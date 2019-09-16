import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet
} from "react-native";
import { LineChart } from "react-native-chart-kit";
import { getImageUri } from "../api/MetaWeather";
import moment from "moment";

const ForecastConditions = ({ conditions }) => {
  const data = {
    labels: conditions.map((condition, index) => {
      if (index == 0) {
        return "Today";
      } else if (index == 1) {
        return "Tomorrow";
      }
      const date = moment(condition.applicable_date);
      return `${date.format("ddd")} ${date.format("D")}`;
    }),
    datasets: [
      {
        data: conditions.map(condition => condition.max_temp),
        color: () => "#C88C32"
      },
      {
        data: conditions.map(condition => condition.the_temp),
        color: () => "#BEBDBD"
      },
      {
        data: conditions.map(condition => condition.min_temp),
        color: () => "#00697D"
      }
    ]
  };

  const chartConfig = {
    backgroundColor: "white",
    backgroundGradientFrom: "white",
    backgroundGradientTo: "white",
    decimalPlaces: 0, // optional, defaults to 2dp
    color: (opacity = 1) => `rgba(0, 105, 125, ${opacity})`,
    style: {
      borderRadius: 16
    }
  };

  const conditionItems = conditions.map((condition, index) => {
    return (
      <TouchableOpacity style={styles.forecastItem} key={index.toString()}>
        <Text>{data.labels[index]}</Text>
        <Image
          style={{ height: 64, width: 64 }}
          source={{ uri: getImageUri(condition.weather_state_abbr) }}
        />
        <Text style={{ fontWeight: "bold" }}>
          {Math.round(condition.the_temp)}°C
        </Text>
      </TouchableOpacity>
    );
  });

  return (
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
      <View>
        <View style={styles.row}>{conditionItems}</View>
        <LineChart
          data={data}
          chartConfig={chartConfig}
          bezier
          withOuterLines={false}
          withShadow={false}
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
    alignItems: "center"
  },
  row: {
    flexDirection: "row",
    justifyContent: "flex-start",
    paddingStart: 6
  }
});

export default ForecastConditions;
