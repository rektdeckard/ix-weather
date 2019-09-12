import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList
} from "react-native";
import SearchBar from '../components/SearchBar';
import useResults from "../hooks/useResults";

/**
 * Landing Screen that lists nearby cities or cities by user query
 */
const LocationListScreen = ({ navigation }) => {
  const [query, SetQuery] = useState("");
  const [searchApi, results, error] = useResults();

  // Display ProgressBar while fetching results
  if (!results) {
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

  const renderItem = ({ item }) => {
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

  return (
    <>
      <SearchBar
        term={query}
        onTermChange={SetQuery}
        onTermSubmit={() => searchApi(query)}
      />
      { error ?
        <View style={styles.container}>
          <Text>{error}</Text>
        </View> : 
        <FlatList
          data={results}
          keyExtractor={result => result.woeid.toString()}
          // contentContainerStyle={styles.flatlist}
          renderItem={renderItem}
          refreshing={false}
          onRefresh={() => searchApi(query)}
        />
      }
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
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
