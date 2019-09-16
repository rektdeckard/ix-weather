import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { withNavigation } from "react-navigation";
import moment from "moment";

/**
 * RenderItem 
 * @param {location object} item  
 */
const HistoryItem = ({ item, navigation }) => {
  return (
    <TouchableOpacity
      style={styles.listitem}
      // On press, pass the location title and ID as params to the DetailScreen via the StackNavigator
      onPress={() => navigation.navigate("Locations", { query: item.term })}
    >
      <Text style={styles.title}>{item.term}</Text>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 1 }}>
        <Text style={styles.details}>{moment(item.timestamp).format("ddd MMM D, YYYY")}</Text>
        <Text style={styles.details}>•</Text>
        <Text style={styles.details}>{moment(item.timestamp).format("h:mma")}</Text>
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

export default withNavigation(HistoryItem);