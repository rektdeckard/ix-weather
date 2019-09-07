import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, Button, FlatList } from 'react-native';

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text>Open up App.js to start working on your app!</Text>
//     </View>
//   );
// }

export default class IxWeather extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      dataSource: []
    };
  }


  componentDidMount() {
    fetch('https://www.metaweather.com/api/location/search/?lattlong=40.671487,-73.9541137')
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({
        isLoading: false,
        dataSource: responseJson
      })  
    })
    .catch((error) => {
      console.error(error);
    });
  }

  renderItem = ({item, index}) => {
    return (
      <View style = {{ alignItems: "flex-start", justifyContent: "center" }}>
        <Text style = {{ fontWeight: "bold", fontSize: 18 }} >{item.title}</Text>
        <Text style = {{ fontSize: 14 }} >{item.location_type}</Text>
        <Text style = {{ fontSize: 14 }} >{"id: " + item.woeid}</Text>
        <View style = {{ height: 2, flex: 1, flexDirection: 'row', backgroundColor: "black", margin: 8 }}/>
      </View>  
    );
  }

  keyExtractor = (item, index) => {
    return index.toString();
  }


  render() {
    return (
      <View style={ styles.app }>
        <FlatList
          data = { this.state.dataSource }
          renderItem = { this.renderItem }
          keyExtractor = { this.keyExtractor }
          contentContainerStyle = { styles.flatlist }
        />  
      </View>
    );
  }

}

const styles = {
  app: {
    flex: 1, 
    // backgroundColor: "black"
  },
  flatlist: {
    alignItems: "flex-start", 
    padding: 16
  },
  listitem: {
    alignItems: "flex-start", 
    justifyContent: "center"
  }

}
