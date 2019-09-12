import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Linking } from 'react-native';
import * as Progress from 'react-native-progress';
import MetaWeather from '../api/MetaWeather';
import CurrentConditions from '../components/CurrentConditions';
import ForecastConditions from '../components/ForecastConditions';

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
      setError("Could not connect to MetaWeather");
    }
  };

  useEffect(() => {
    getResult(id);
  }, [error]);

  if (!result) {
    return (
      <View style={styles.progress}>
        <Progress.Bar
          indeterminate={true}
          useNativeDriver={true}
          color={'gray'}
          height={8}
          width={256}
        />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>{error}</Text>
      </View>
    );
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <CurrentConditions conditions={result.consolidated_weather[0]} />
        {/* <View style={{ height: 1, width: 400, backgroundColor: 'gray'}} /> */}
        <ForecastConditions conditions={result.consolidated_weather} />
        <View style={{ flexDirection: "row", justifyContent: "center", margin: 24 }}>
          <Text style={{ fontSize: 10, color: 'gray' }}>Weather data provided by </Text>
          <Text style={{fontSize: 10, color: '#00697D'}}
            onPress={() => Linking.openURL('https://www.metaweather.com/')}>
            MetaWeather
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

/**
 * Set the toolbar title to the name of the city, passed as navigation param
 */
DetailScreen.navigationOptions = ({ navigation }) => ({
  title: navigation.getParam('title')
});

const styles = StyleSheet.create({
  container: {
  },
  progress: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  }
});

export default DetailScreen;