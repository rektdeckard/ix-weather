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
  const [query, SetQuery] = useState("");
  const [searchApi, results, error] = useResults();

  // If 
  // The SectionList prop ListEmptyComponent will not display if the list contains header components


  return (
    <>
      <SearchBar
        term={query}
        onTermChange={SetQuery}
        onTermSubmit={() => searchApi(query)}
      />
      {error ? (<ErrorItem message={error} />) : 
        (results.length < 1) ? (<ErrorItem message={"No results"} />) : (
        <SectionList
          sections={[
            { title: "Favorites", data: results.slice(2, 4) },
            { title: "Locations", data: results }
          ]}
          keyExtractor={result => result.woeid.toString()}
          stickySectionHeadersEnabled={true}
          stickyHeaderIndices={[0]}
          refreshing={false}
          onRefresh={() => searchApi(query)}
          renderItem={({ item, index }) => {
            return <ListItem key={index} item={item} />;
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
