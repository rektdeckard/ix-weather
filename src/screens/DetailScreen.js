import React, { useState, useEffect } from 'react';
import { View, Text, Image, FlatList, StyleSheet } from 'react-native';
import metaWeather from '../api/metaWeather';
import CurrentConditions from '../components/CurrentConditions';
import ForecastConditions from '../components/ForecastConditions';


const DetailScreen = ({ navigation }) => {
  const id = navigation.getParam("id");
  const [result, setResult] = useState(null);

  const getResult = async id => {
    const response = await metaWeather.get(`/api/location/${id}`);
    setResult(response.data);
  };

  useEffect(() => {
    getResult(id);
  }, []);

  if (!result) {
    return null;
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

});

export default DetailScreen;