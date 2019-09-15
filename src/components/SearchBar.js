import React from "react";
import { View, TextInput, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import Autocomplete from 'react-native-autocomplete-input';

/**
 * SearchBar component for the LocationListScreen
 * takes a {string} @param term for the search term, and callbacks @param onTermChange and @param onTermSubmit
 */
const SearchBar = ({ searches, term, onTermChange, onTermSubmit }) => {
  return (
    <View style={styles.backgroundStyle}>
      <View style={styles.barStyle}>
        <TouchableOpacity
          style={{ alignItems: "center", justifyContent: "center" }}
            onPress={() => onTermSubmit()}
          >
          <Feather name="search" style={styles.iconStyle} />
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
        {/* <Autocomplete 
          data={searches}
          // defaultValue={term}
          // onChangeText={onTermChange}
          placeholder={"Search Locations"}
          // containerStyle={styles.inputStyle}
          autoCorrect={false}
          onSubmitEditing={onTermSubmit}
          renderItem={({query, timestamp}) => {
            <TouchableOpacity key= {timestamp} onPress={onTermSubmit(query)}>
              <View style={{ flexDirection: 'row' }} >
                <Text>{query}</Text>
                <Text>{timestamp}</Text>
              </View>
            </TouchableOpacity>
          }}
        /> */}
        <TouchableOpacity
          style={{ alignItems: "center", justifyContent: "center" }}
          onPress={() => onTermChange("")}
        >
          <Feather name="x" style={styles.iconStyle} />
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
  }
});

export default SearchBar;
