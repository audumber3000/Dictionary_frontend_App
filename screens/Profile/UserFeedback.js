import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import { View, ScrollView, TextInput, Button, Text, StyleSheet } from 'react-native';

const UserFeedback = () => {
  const [feedbackText, setFeedbackText] = useState('');
  const [submitEnabled, setSubmitEnabled] = useState(false);

  const handleFeedbackTextChange = (text) => {
    setFeedbackText(text);
    setSubmitEnabled(text.length > 0);
  };

  const handleSubmit = () => {
    // handle form submission logic here
    console.log(feedbackText);
    
    setFeedbackText('');
    setSubmitEnabled(false);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>We'd love to hear your feedback!</Text>
        <Text style={styles.subtitle}>Please tell us what you love about the app or what we could be doing better.</Text>
        <TextInput
          placeholder="Enter feedback "
          value={feedbackText}
          onChangeText={handleFeedbackTextChange}
          style={styles.input}
        />
        </ScrollView>
        <View style={styles.buttonContainer}>
          <Button title="Send Feedback"  onPress={handleSubmit} disabled={!submitEnabled} color="#3730a3" />
        </View>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop:10,
    paddingLeft:10,
    paddingRight:10,
    marginBottom: 5,
  },
  subtitle: {
    paddingLeft:10,
    color:'#808080',
    paddingBottom:10,
    fontSize: 14,
  },
  input: {
    paddingLeft:10,
    paddingRight:10,
    borderBottomWidth: 1,
    borderColor: 'gray',
    marginBottom: 20,
    padding: 10,
  },
  buttonContainer: {
    alignSelf: 'stretch',
    padding:20,
    
  }
 
});

export default UserFeedback;
