import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, SectionList } from "react-native";
import useResults from "../hooks/useResults";
import SearchBar from "../components/SearchBar";
import ListItem from "../components/ListItem";
import ErrorItem from "../components/ErrorItem";
import useAsyncStore from "../hooks/useAsyncStore";

/**
 * Landing Screen that lists nearby cities or cities by user query
 */
const LocationListScreen = () => {
  // Use Hooks for stateful behavior of query string, favorites and result data
  const [query, SetQuery] = useState("");
  const [searchApi, results, error] = useResults();
  const [favorites, storeFavorites, searches, storeSearches] = useAsyncStore();
  
  // useEffect(() => {
  //   // THIS DUPLICATES THE STORAGE CONTENTS!
  //   storeFavorites(favorites);
  //   storeSearches(searches);
  // }, [favorites, searches]);

  console.log(`State at ${Date.now()}: ${JSON.stringify(searches)}`);

  return (
    <>
      <SearchBar
        searches={searches}
        term={query}
        onTermChange={SetQuery}
        onTermSubmit={() => {
          searchApi(query);
          storeSearches(searches.push({ query, timestamp: Date.now() }));
        }}
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
