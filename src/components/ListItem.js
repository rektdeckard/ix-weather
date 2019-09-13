import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { withNavigation } from "react-navigation";

const ListItem = ({ item, navigation }) => {
  return (
    <TouchableOpacity
      style={styles.listitem}
      // Pass the location title and ID as params to the DetailScreen via the StackNavigator
      onPress={() => navigation.navigate("Detail", { title: item.title, id: item.woeid })}
    >
      <Text style={styles.title}>{item.title}</Text>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 1 }}>
        <Text style={styles.details}>{item.location_type}</Text>
        <Text style={styles.details}>•</Text>
        <Text style={styles.details}>{"id: " + item.woeid}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  listitem: {
    alignItems: "flex-start",
    justifyContent: "center",
    paddingStart: 16,
    paddingVertical: 8
  },
  title: { 
    fontWeight: "bold", 
    fontSize: 18,
  },
  details: { 
    fontSize: 14, 
    textTransform: 'uppercase', 
    color: 'gray',
    marginEnd: 8 
  }
});

export default withNavigation(ListItem);