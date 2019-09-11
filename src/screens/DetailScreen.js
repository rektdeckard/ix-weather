import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import * as Progress from 'react-native-progress';
import MetaWeather from '../api/MetaWeather';
import CurrentConditions from '../components/CurrentConditions';
import ForecastConditions from '../components/ForecastConditions';


const DetailScreen = ({ navigation }) => {
  const id = navigation.getParam("id");
  const [result, setResult] = useState(null);

  const getResult = async id => {
    const response = await MetaWeather.get(`/api/location/${id}`);
    setResult(response.data);
  };

  useEffect(() => {
    getResult(id);
  }, []);

  if (!result) {
    return (
      <View style={styles.container}>
        <Progress.Bar
          style={styles.progress}
          indeterminate={true}
          useNativeDriver={true}
          color={'gray'}
          height={8}
          width={256}
        />
      </View>
    );
  }

  return (
    <View>
      <CurrentConditions conditions={result.consolidated_weather[0]} />
      <ForecastConditions conditions={result.consolidated_weather} />
    </View>
  );
};

DetailScreen.navigationOptions = ({ navigation }) => ({
  title: navigation.getParam('title')
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  progress: {
    
  }
});

export default DetailScreen;