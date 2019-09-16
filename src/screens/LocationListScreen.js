import React, {useState, useEffect, useContext} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SectionList,
} from 'react-native';
import useResults from '../hooks/useResults';
import SearchBar from '../components/SearchBar';
import ListItem from '../components/ListItem';
import ErrorItem from '../components/ErrorItem';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Context as SearchesContext} from '../context/SearchesContext';

/**
 * Landing Screen that lists nearby cities or cities by user query.
 */
const LocationListScreen = ({navigation}) => {
  // Query string that user entered into the SearchBar
  const [query, SetQuery] = useState('');

  // Hook to the MetaWeather API
  const [searchApi, results, error] = useResults();

  // Search History 
  const {state, addSearch} = useContext(SearchesContext);

  // Given more time, I would like to have completed a Favorites feature for saving favortie cities
  // to a quick-access list.

  // On navigate from HistoryScreen, get the query, populate the SearchBar with it, and poll the API
  const requery = navigation.getParam('query');
  useEffect(() => {
    if (requery && requery !== query) {
      SetQuery(requery);
      searchApi(requery);
    }
  }, [requery]);

  return (
    <>
      <SearchBar
        searches={state}
        term={query}
        onTermChange={SetQuery}
        onTermSubmit={() => {
          searchApi(query);
          addSearch(query, Date.now());
        }}
      />
      {/* If network request errors or returns no results, display error message. Else show data in a SectionList */}
      {error ? (
        <ErrorItem message={error} />
      ) : results.length < 1 ? (
        <ErrorItem message={'No Results'} />
      ) : (
        <SectionList
          sections={[
            // Currently, the favorites data array is empty.
            // If completed, this list would live-filter when the user enters text in the SearchBar
            {title: 'Favorites', data: []}, //favorites.filter(item => item.title.toLowerCase().includes(query.toLowerCase())) },
            {title: 'Locations', data: results},
          ]}
          keyExtractor={result => result.woeid.toString()}
          stickySectionHeadersEnabled={true}
          refreshing={false}
          onRefresh={() => searchApi(query)}
          renderItem={({item}) => {
            return <ListItem item={item} />;
          }}
          renderSectionHeader={({section: {title}}) => (
            <View style={styles.header}>
              <Text style={{fontWeight: 'bold', textTransform: 'uppercase'}}>
                {title}
              </Text>
            </View>
          )}
          ItemSeparatorComponent={() => {
            return <View style={{height: 1, backgroundColor: 'lightgray'}} />;
          }}
        />
      )}
    </>
  );
};

// Set the toolbar button
LocationListScreen.navigationOptions = ({navigation}) => {
  return {
    headerRight: (
      <TouchableOpacity
        style={{padding: 16}}
        onPress={() => navigation.navigate('History')}>
        <Icon name="history" size={30} color="white" />
      </TouchableOpacity>
    ),
  };
};

const styles = StyleSheet.create({
  flatlist: {
    alignItems: 'flex-start',
    padding: 16,
  },
  header: {
    backgroundColor: 'lightgray',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
});

export default LocationListScreen;
