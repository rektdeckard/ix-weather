import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList
} from "react-native";
import SearchBar from '../components/SearchBar';
import useResults from "../hooks/useResults";

const LocationListScreen = ({ navigation }) => {
  const [query, SetQuery] = useState("");
  const [searchApi, results, error] = useResults();

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.listitem}
        onPress={() => navigation.navigate("Detail", { title: item.title, id: item.woeid })}
      >
        <Text style={{ fontWeight: "bold", fontSize: 18 }}>{item.title}</Text>
        <Text style={{ fontSize: 14 }}>{item.location_type}</Text>
        <Text style={{ fontSize: 14 }}>{"id: " + item.woeid}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <SearchBar
        term={query}
        onTermChange={SetQuery}
        onTermSubmit={() => searchApi(query)}
      />
      <FlatList
        data={results}
        keyExtractor={result => result.woeid.toString()}
        // contentContainerStyle={styles.flatlist}
        renderItem={renderItem}
      />
    </>
  );
};

const styles = StyleSheet.create({
  flatlist: {
    alignItems: "flex-start",
    padding: 16
  },
  listitem: {
    alignItems: "flex-start",
    justifyContent: "center",
    paddingStart: 16,
    paddingBottom: 16

  }
});

export default LocationListScreen;
