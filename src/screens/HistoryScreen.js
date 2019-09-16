import React, { useContext, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, SectionList } from "react-native";
import HistoryItem from '../components/HistoryItem';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Context as SearchesContext } from "../context/SearchesContext";
import ErrorItem from "../components/ErrorItem";

/**
 * Landing Screen that lists nearby cities or cities by user query
 */
const HistoryScreen = ({ navigation }) => {
  // Use Hooks for stateful behavior of search history
  const { state, deleteSearch, getSearches } = useContext(SearchesContext);

  // Pass delete function to the toolbar
  useEffect(() => {
    navigation.setParams({ deleteSearch });
    getSearches();
  }, []);

  return (
    <>
      {state ? (
        <SectionList
          sections={[
            // Replace the 'Favorites' data set with the one persisted
            { title: "Previous Searches", data: state.slice().reverse() }
          ]}
          keyExtractor={item => item.timestamp.toString()}
          stickySectionHeadersEnabled={true}
          renderItem={({ item }) => {
            return <HistoryItem item={item} />;
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
      
        
      ) : <ErrorItem message="None" />}
    </>
  );
};

HistoryScreen.navigationOptions = ({ navigation }) => {
  const deleteSearch = navigation.getParam('deleteSearch');

  return {
    title: "History",
    headerRight: (
      <TouchableOpacity
        style={{ padding: 16 }}
        onPress={() => deleteSearch()}
      >
        <Icon name="clear" size={30} color="white" />
      </TouchableOpacity>
    )
  };
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: "lightgray",
    paddingHorizontal: 16,
    paddingVertical: 8
  }
});

export default HistoryScreen;
