import React from 'react';
import { LineChart } from 'react-native-chart-kit';
import moment from 'moment';

const ForecastChart = ({ conditions }) => {

  const data= {
    labels: conditions.map(condition => moment(condition.applicable_date).format('ddd')),
    datasets: [
      { data: conditions.map(condition => condition.max_temp) },
      { data: conditions.map(condition => condition.the_temp) },
      { data: conditions.map(condition => condition.min_temp) }
    ]
  };

  const chartConfig = {
    backgroundColor: 'white',
    // backgroundColor: `rgba(0, 0, 0, 0)`,
    backgroundGradientFrom: 'white',
    backgroundGradientTo: 'white',
    decimalPlaces: 0, // optional, defaults to 2dp
    color: (opacity = 1) => `rgba(0, 105, 125, ${opacity})`,
    style: {
      borderRadius: 16
    }
  };

  // if (!data) return null;

  return (
    <LineChart
      data={data}
      chartConfig={chartConfig}
      bezier
      withInnerLines={false}
      withOuterLines={false}
      // fromZero={true}
      height={200}
      width={700}
      style={{
        marginVertical: 8,
        borderRadius: 16
      }}
    />
  );

};

export default ForecastChart;