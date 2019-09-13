import React, { useState } from "react";
import { StyleSheet, Text, View, SectionList } from "react-native";
import SearchBar from "../components/SearchBar";
import useResults from "../hooks/useResults";
import ListItem from "../components/ListItem";
import ErrorItem from "../components/ErrorItem";

/**
 * Landing Screen that lists nearby cities or cities by user query
 */
const LocationListScreen = () => {
  // Use Hooks for stateful behavior of query string, favorites and result data
  const [query, SetQuery] = useState("");
  const [searchApi, results, error] = useResults();
  const [favorites, setFavorites] = useState([]);

  return (
    <>
      <SearchBar
        term={query}
        onTermChange={SetQuery}
        onTermSubmit={() => searchApi(query)}
      />
      {/* If network request errors or returns no results, display error message. Else show data in a SectionList */}
      {error ? (
        <ErrorItem message={error} />
      ) : results.length < 1 ? (
        <ErrorItem message={"No Results"} />
      ) : (
        <SectionList
          sections={[
            // Replace the 'Favorites' data set with the one persisted
            { title: "Favorites", data: favorites.filter(item => item.title.toLowerCase().includes(query.toLowerCase())) },
            { title: "Locations", data: results }
          ]}
          keyExtractor={result => result.woeid.toString()}
          stickySectionHeadersEnabled={true}
          refreshing={false}
          onRefresh={() => searchApi(query)}
          renderItem={({ item }) => {
            return <ListItem item={item} />;
          }}
          renderSectionHeader={({ section: { title } }) => (
            <View style={styles.header}>
              <Text style={{ fontWeight: "bold", textTransform: "uppercase" }}>
                {title}
              </Text>
            </View>
          )}
          ItemSeparatorComponent={() => {
            return <View style={{ height: 1, backgroundColor: "lightgray" }} />;
          }}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  flatlist: {
    alignItems: "flex-start",
    padding: 16
  },
  header: {
    backgroundColor: "lightgray",
    paddingHorizontal: 16,
    paddingVertical: 8
  }
});

export default LocationListScreen;
