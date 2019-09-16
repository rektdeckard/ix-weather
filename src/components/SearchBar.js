import React, { useContext } from "react";
import { View, TextInput, Text, TouchableOpacity, StyleSheet } from "react-native";
import Icon from 'react-native-vector-icons/Feather';
import { Context as SearchesContext } from '../context/SearchesContext'

/**
 * SearchBar component for the LocationListScreen
 * takes a {string} @param term for the search term, and callbacks @param onTermChange and @param onTermSubmit
 */
const SearchBar = ({ term, onTermChange, onTermSubmit }) => {
  const {state, addSearch } = useContext(SearchesContext);

  return (
    <View style={styles.backgroundStyle}>
      <View style={styles.barStyle}>
        <TouchableOpacity
          style={{ alignItems: "center", justifyContent: "center" }}
            onPress={() => onTermSubmit()}
          >
          <Icon name="search" style={styles.iconStyle} />
        </TouchableOpacity>
        <TextInput
          style={styles.inputStyle}
          returnKeyType="search"
          textContentType="addressCity"
          placeholder="Search Locations"
          autoCorrect={false}
          value={term}
          onChangeText={onTermChange}
          onSubmitEditing={onTermSubmit}
        />
        {/* <View style={styles.autocompleteContainer}>
          <Autocomplete 
            data={state}
            keyExtractor={item => item.timestamp.toString()}
            onChangeText={onTermChange}
            placeholder={"Search Locations"}
            // containerStyle={styles.inputStyle}
            autoCorrect={false}
            onSubmitEditing={onTermSubmit}
            renderItem={({item }) => (
              <TouchableOpacity onPress={() => onTermChange(item.term) && onTermSubmit()}>
                <View style={{ flexDirection: 'row' }} >
                  <Text>{item.term}</Text>
                  <Text>{item.timestamp}</Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </View> */}
        <TouchableOpacity
          style={{ alignItems: "center", justifyContent: "center" }}
          onPress={() => onTermChange("")}
        >
          <Icon name="x" style={styles.iconStyle} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundStyle: {
    backgroundColor: "#F0EEEEEE"
  },
  barStyle: {
    backgroundColor: "white",
    height: 48,
    borderRadius: 8,
    marginVertical: 10,
    marginHorizontal: 15,
    flexDirection: "row",
    alignItems: "center"
  },
  inputStyle: {
    flex: 1,
    fontSize: 18
  },
  iconStyle: {
    fontSize: 28,
    alignSelf: "center",
    marginHorizontal: 16
  },
  // autocompleteContainer: {
  //   flex: 1,
  //   left: 0,
  //   position: 'absolute',
  //   right: 0,
  //   top: 0,
  //   zIndex: 1
  // }
});

export default SearchBar;
