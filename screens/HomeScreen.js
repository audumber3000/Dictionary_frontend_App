import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet , ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Expo's icon component
import SlideAlert from '../components/SlideAlert';
import { NavigationContainer, useNavigation } from '@react-navigation/native';

const predefinedWordList = [
  "Lion",
  "Elephant",
  "Tiger",
  "Giraffe",
  "Zebra",
  "Rhinoceros",
  "Cheetah",
  "Hippopotamus",
  "Gorilla",
  "Kangaroo",
  "Koala",
  "Panda",
  "Penguin",
  "Polar Bear",
  "Grizzly Bear",
  "Chimpanzee",
  "Dolphin",
  "Whale",
  "Shark",
  "Octopus",
  "Crocodile",
  "Alligator",
  "Snake",
  "Lizard",
  "Frog",
  "Turtle",
  "Owl",
  "Eagle",
  "Falcon",
  "Hawk",
  "Parrot",
  "Peacock",
  "Sparrow",
  "Flamingo",
  "Pigeon",
  "Butterfly",
  "Bee",
  "Ant",
  "Ladybug",
  "Spider",
  "Snail",
  "Lobster",
  "Crab",
  "Jellyfish",
  "Starfish",
  "Seahorse",
  "Clownfish",
  "Salmon",
];


const HomeScreen = () => {
  const navigation = useNavigation();
  const [searchTerm, setSearchTerm] = useState('');
  const [wordData, setWordData] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [suggestionsVisible, setSuggestionsVisible] = useState(false); // New state for managing suggestion card visibility
  const [loading, setLoading] = useState(false); // New state for loading indicator
  const [slideAlertMessage, setSlideAlertMessage] = useState(''); // Add this line


  const handleSearch = async() => {
    try {
      setLoading(true);
      const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${searchTerm}`);
      const data = await response.json();

      if (data && Array.isArray(data) && data.length > 0) {
        navigation.navigate('SearchResults', { searchResults: data });
      } else {
        // Show the slide-in and slide-up alert
        console.log("Word not found")
        setSlideAlertMessage('Sorry, we couldn\'t find definitions for the word you were looking for.');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }

  };

  const handleSuggestionSelect = (selectedSuggestion) => {
    console.log(selectedSuggestion)
    setSearchTerm(selectedSuggestion);
    setSuggestions([]);
    setSuggestionsVisible(false);
  };

  const handleInputChange = (text) => {
    setSearchTerm(text);

    if (text.length >= 2) {
      // Filter suggestions based on the predefined word list
      const filteredSuggestions = predefinedWordList.filter(
        (word) => word.toLowerCase().includes(text.toLowerCase())
      );

      setSuggestions(filteredSuggestions);
      setSuggestionsVisible(true);
    } else {
      setSuggestions([]); // Clear suggestions if less than 2 letters
      setSuggestionsVisible(false);
    }
  };



  return (
    <View style={styles.container}>
      <View style={styles.blueBackground} />

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Search for a word"
          value={searchTerm}
          onChangeText={handleInputChange}
          onFocus={() => setSuggestionsVisible(true)} // Show suggestions on focus
          onBlur={() => setSuggestionsVisible(false)} // Hide suggestions on blur
        />
        <Ionicons
          name="search"
          size={26}
          color="#007AFF"
          onPress={handleSearch}
        />
        
      </View>

      {/*
  Rendering the list of suggestions with updated styling
*/}
      {suggestionsVisible && suggestions.length > 0 && (
        <View style={styles.suggestionsContainer}>
          <Text style={styles.suggestionsTitle}>Suggestions:</Text>
          <FlatList
            data={suggestions}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => handleSuggestionSelect(item)} // Handle suggestion selection
                style={styles.suggestionItemContainer} // Apply the suggestion item style
              >
                <Text style={styles.suggestionItemText}>{item}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item}
            contentContainerStyle={styles.suggestionsList}
          />
        </View>
      )}


      {wordData && (
        <View style={styles.wordDetailsContainer}>
          <Text style={styles.wordTitle}>{wordData[0].word}</Text>
          <Text style={styles.phonetic}>{wordData[0].phonetic}</Text>
          <FlatList
            data={wordData[0].meanings}
            renderItem={({ item }) => (
              <View style={styles.meaningContainer}>
                <Text style={styles.partOfSpeech}>{item.partOfSpeech}</Text>
                {item.definitions.map((definition, index) => (
                  <Text key={index} style={styles.definition}>
                    {definition.definition}
                  </Text>
                ))}
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={styles.meaningsList}
          />
        </View>
      )}
     {loading && (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    )}
 {slideAlertMessage !== '' && (
      <SlideAlert message={slideAlertMessage} onSlideUpComplete={() => setSlideAlertMessage('')}/>
      
    )}
  

      {/* ... Rest of your code ... */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  blueBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '30%', // Cover 20% of the screen
    backgroundColor: '#2E86C1', // Sky blue color
    borderBottomRightRadius: 20, // Rounded corners at the bottom
    borderBottomLeftRadius: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '30%', // Add some space below the blue background
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 8,
    fontSize: 20,
    color: '#333',
  },
  suggestionsContainer: {
    marginTop: 10,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
  suggestionsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  suggestionsList: {
    marginTop: 5,
  },
  suggestionItemContainer: {
    borderBottomWidth: 1, // Add a line between each suggestion
    borderBottomColor: '#ccc',
    paddingVertical: 8,
  },
  suggestionItemText: {
    fontSize: 18, // Increase the font size
    color: '#333',
  },
  wordDetailsContainer: {
    marginTop: 20,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
  wordTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  phonetic: {
    fontSize: 16,
    color: '#555',
  },
  meaningContainer: {
    marginBottom: 10,
  },
  partOfSpeech: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  definition: {
    fontSize: 14,
    color: '#333',
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: '20%',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    zIndex: 1,
  }
});

export default HomeScreen;
