import React, { useState } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import SearchBar from "../components/SearchBar";
import useResults from "../hooks/useResults";
import ListItem from "../components/ListItem";

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
          color={"gray"}
          height={8}
          width={256}
        />
      </View>
    );
  }

  return (
    <>
      <SearchBar
        term={query}
        onTermChange={SetQuery}
        onTermSubmit={() => searchApi(query)}
      />
      {error ? (
        <View style={styles.container}>
          <Text>{error}</Text>
        </View>
      ) : (
        <FlatList
          data={results}
          keyExtractor={result => result.woeid.toString()}
          refreshing={false}
          onRefresh={() => searchApi(query)}
          // contentContainerStyle={styles.flatlist}
          renderItem={({ item }) => {
            return <ListItem item={item} />;
          }}
        />
      )}
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
  }
});

export default LocationListScreen;
