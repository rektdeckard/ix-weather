import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

const SearchBar = ({ term, onTermChange, onTermSubmit }) => {
  return (
    <View style={styles.backgroundStyle}>
      <Feather name="search" style={styles.iconStyle} />
      <TextInput
        style={styles.inputStyle}
        placeholder="Search"
        autoCorrect={false}
        value={term}
        onChangeText={onTermChange}
        onSubmitEditing={onTermSubmit}
      />
      <TouchableOpacity
        style={{ alignItems: "center", justifyContent: "center" }}
        onPress={() => onTermChange("")}
      >
        <Feather name="x" style={styles.iconStyle} />
      </TouchableOpacity>  
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundStyle: {
    backgroundColor: "#F0EEEEEE",
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
});

export default SearchBar;
