import React, { useState,useEffect } from "react";
import { View, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard,BackHandler } from 'react-native';
import { Heading, VStack, FormControl, Input, Button, Center, NativeBaseProvider, Image, ScrollView } from "native-base";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {signup} from '../../api/auth'
import { useNavigation } from '@react-navigation/native';
import SlideAlert from '../../components/TostMessage/SlideAlert';

const SignupPage = () => {
  useEffect(() => {
    const backAction = BackHandler.exitApp()

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction)
    
    return ()=>backHandler.remove()
  },[])
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [slideAlertMessage, setSlideAlertMessage] = useState(''); // Add this line


  const navigation = useNavigation();

  const handleDismissKeyboard = () => {
    Keyboard.dismiss();
  };



  const handleSignup = async () => {
    try {
      setIsLoading(true);

      console.log("Sreenidhi");
      // Make a POST request to the API with the contact
      handleDismissKeyboard
      
      
     const contact= await AsyncStorage.getItem('contact');
     const password = contact + "Pass@123"

     console.log('phone', contact);
      const data = await signup( contact, password, name , email)

      
      if(data.statusCode == 201){
        console.log("Code 200")
        setIsLoading(false)
        await authCtx.authenticate(data.token.access.token)
        navigation.navigate('SignUp1');
      }else
      {
        setSlideAlertMessage('Sorry, Looks like somthing went wrong !');
        setIsLoading(false)
        
      }
      
      // Simulate a delay (replace with actual logic)
      setTimeout(() => {
        // After successful signup or error handling, reset isLoading
        setIsLoading(false);
      }, 2000);
    } catch (error) {
      console.error(error);
      setIsLoading(false); // Reset isLoading in case of an error
    }
  };

  return (
    <NativeBaseProvider>
      <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
        <TouchableWithoutFeedback onPress={handleDismissKeyboard}>
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View style={{ flex: 1 }}>
              <Image
                alt="Description of the image"
                source={{ uri: 'https://cdni.iconscout.com/illustration/premium/thumb/sign-up-or-registration-to-e-payment-application-3159825-2631917.png' }}
                style={{ width: '100%', height: '35%', borderBottomLeftRadius: 20, borderBottomRightRadius: 20 }}
                resizeMode="cover"
              />
              <Center flex={1} bg="white" px={3} paddingTop={5}>
                <VStack space={3} width="100%">
                <Heading size="lg" fontWeight="700" color="coolGray.800" _dark={{
        color: "warmGray.50"
      }}>
                    SignUp
                  </Heading>
                  <Heading mt="1" _dark={{
                    color: "warmGray.200"
                  }} color="coolGray.600" fontWeight="medium" size="xs" style={{ marginTop: -7 }}>
                    Almost done ! just wana know you more :)
                  </Heading>
                  <FormControl>
                    <FormControl.Label>Name</FormControl.Label>
                    <Input
                      placeholder="Enter your name"
                      value={name}
                      onChangeText={text => setName(text)}
                      size="lg"
                      style={{ height: 50 }} // Set custom input height
                    />
                  </FormControl>
                  <FormControl>
                    <FormControl.Label>Email</FormControl.Label>
                    <Input
                      placeholder="Enter your email"
                      value={email}
                      onChangeText={text => setEmail(text)}
                      keyboardType="email-address"
                      size="lg"
                      style={{ height: 50 }} // Set custom input height
                    />
                  </FormControl>
            
                  <Button
                    mt={2}
                    colorScheme="indigo"
                    size="lg"
                    isLoading={isLoading}
                    onPress={handleSignup}
                    isDisabled={isLoading}
                    isLoadingText="Signing Up"
                  >
                    SignUp
                  </Button>
                </VStack>
              </Center>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
      {/* <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleDateConfirm}
        onCancel={hideDatePicker}
      /> */}
      {slideAlertMessage !== '' && (
        <SlideAlert message={slideAlertMessage} onSlideUpComplete={() => setSlideAlertMessage('')} />

      )}
    </NativeBaseProvider>
  );
};

export default SignupPage;
