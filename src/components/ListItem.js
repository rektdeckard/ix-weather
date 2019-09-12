import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { withNavigation } from "react-navigation";

const ListItem = ({ item, navigation }) => {
  return (
    <TouchableOpacity
      style={styles.listitem}
      // Pass the location title and ID as params to the DetailScreen via the StackNavigator
      onPress={() => navigation.navigate("Detail", { title: item.title, id: item.woeid })}
    >
      <Text style={{ fontWeight: "bold", fontSize: 18 }}>{item.title}</Text>
      <Text style={{ fontSize: 14 }}>{item.location_type}</Text>
      <Text style={{ fontSize: 14 }}>{"id: " + item.woeid}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  listitem: {
    alignItems: "flex-start",
    justifyContent: "center",
    paddingStart: 16,
    paddingVertical: 8

  }
});

export default withNavigation(ListItem);