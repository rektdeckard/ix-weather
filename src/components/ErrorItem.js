import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ErrorItem = ({ message }) => {
  return (
    <View style={styles.container}>
      <Text>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
});

export default ErrorItem;