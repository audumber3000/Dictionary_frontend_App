import { Lable } from 'react-native';
import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, TouchableOpacity } from 'react-native';
import { View, Text, Progress, ScrollView, Badge, Icon, IconButton, Box, Button, FlatList, Heading, Divider, Avatar, HStack, VStack, Spacer, Switch, Center, NativeBaseProvider } from "native-base";
import { Feather } from '@expo/vector-icons';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { GlobalStyles } from '../constants/style';
import { AuthContext } from '../store/auth-context';
import BottomScreenDrawer from '../components/Notification_bottomdrawer';


function ProfileScreen() {
  const authCtx = useContext(AuthContext);
  const navigation = useNavigation();
  const apiData = {
    numerator: 3,
    denominator: 5
  };

  const percentage = (apiData.numerator / apiData.denominator) * 100;


  const [isToggleOn1, setIsToggleOn1] = useState(false);
  const [isToggleOn2, setIsToggleOn2] = useState(false);
  const [isToggleOn3, setIsToggleOn3] = useState(false);

  const handleToggleChange1 = () => {
    setIsToggleOn1(!isToggleOn1);
  };

  const handleToggleChange2 = () => {
    setIsToggleOn2(!isToggleOn2);
  };

  const handleToggleChange3 = () => {
    setIsToggleOn3(!isToggleOn3);
  };


  const [isBottomDrawerVisible1, setIsBottomDrawerVisible1] = React.useState(false);
  const [isBottomDrawerVisible2, setIsBottomDrawerVisible2] = React.useState(false);
  const [isBottomDrawerVisible3, setIsBottomDrawerVisible3] = React.useState(false);

  const handleCloseBottomDrawer1 = () => {
    setIsBottomDrawerVisible1(false);

  }

  const handleCloseBottomDrawer2 = () => {
    setIsBottomDrawerVisible2(false);
  }

  const handleCloseBottomDrawer3 = () => {
    setIsBottomDrawerVisible3(false);
  }

  const contentSectionON = (
    <Box style={{margin:"1%"}}>
      <HStack alignItems="flex-start">
        <Ionicons name="notifications-outline" size={20} color="black" style={{ marginRight: 7 }} />
        <Text style={{ marginBottom: 15, textAlign: 'left', alignContent: 'flex-start' }}>If you turn off notifications, you might miss important updates, news, or events related to the app or service</Text>
      </HStack>
      <HStack alignItems="flex-start">
        <Ionicons name="notifications-outline" size={20} color="black" style={{ marginRight: 7 }} />
        <Text style={{ marginBottom: 15, textAlign: 'left', alignContent: 'flex-start' }}> Notifications can help keep you engaged with app, as they provide a constant reminder.</Text>
      </HStack>
      <HStack alignItems="flex-start">
        <Ionicons name="notifications-outline" size={20} color="black" style={{ marginRight: 7 }} />
        <Text style={{ marginBottom: 20, textAlign: 'left', alignContent: 'flex-start' }}>Notifications offer timely reminders and personalized updates for a better user experience.</Text>
      </HStack>

    </Box>
  );

  const contentSectionOFF = (
    <Box style={{margin:"1%"}}>
      <HStack alignItems="flex-start">
        <Ionicons name="notifications-outline" size={20} color="black" style={{ marginRight: 7 }} />
        <Text style={{ marginBottom: 15, textAlign: 'left', alignContent: 'flex-start' }}>Select ON to recieve notifications instantly</Text>
      </HStack>
      <HStack alignItems="flex-start">
        <Ionicons name="notifications-outline" size={20} color="black" style={{ marginRight: 7 }} />
        <Text style={{ marginBottom: 15, textAlign: 'left', alignContent: 'flex-start' }}>Enabling notifications provides real-time updates and convenient access to important information on your mobile device. </Text>
      </HStack>
      <HStack alignItems="flex-start">
        <Ionicons name="notifications-outline" size={20} color="black" style={{ marginRight: 7 }} />
        <Text style={{ marginBottom: 20, textAlign: 'left', alignContent: 'flex-start' }}>Notifications offer timely reminders and personalized updates for a better user experience.</Text>
      </HStack>

    </Box>
  );






  const logout_function = async () => {
    console.log("logging you out..")
    await authCtx.logout()
  }


  const Stack = createStackNavigator();

  return (
    <>
      <NavigationContainer independent={true} >

        <NativeBaseProvider>

          <ScrollView maxW="100%">


            <VStack space={2} pt="4" alignItems="center">

              <Avatar bg="amber.500" source={{
                uri: "https://images.unsplash.com/photo-1614289371518-722f2615943d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
              }} size="2xl">
                NB
                <Avatar.Badge bg="green.500" />
              </Avatar>

              <Heading pt="2" size="lg" style={{ color: "grey" }}>Audumber Chaudhari</Heading>

              <HStack>
                <Box w="80%" pt="2"><Progress size="lg" colorScheme="emerald" bg={GlobalStyles.colors.primary200} mb={4} value={percentage} mx={4} />
                </Box>
                <Text fontSize="lg" color="green">{percentage}%</Text>

              </HStack>

              <Box border="8" px="2" borderRadius="lg" backgroundColor="white" style={{ marginTop: 5, width: "95%" }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', padding: "2%" }}>
                  <Ionicons name="refresh-circle-outline" size={24} color={GlobalStyles.colors.thridFond} />
                  <Text style={styles.title}>{"  "}App Version</Text>

                  <View style={{ flex: 1, alignItems: 'flex-end' }}>
                    <Badge colorScheme="info" borderRadius="15" >V1.1.23</Badge>

                  </View>
                  <View style={{ flex: 0, alignItems: 'flex-end' }}>
                    <Ionicons name="chevron-forward-outline" size={24} color={GlobalStyles.colors.thridFond} />
                  </View>
                </View>
              </Box>


              {/* //Acadamic Information */}
              <Box border="8" px="2" borderRadius="lg" backgroundColor="white" style={{ marginTop: 5, width: "95%" }}>



                {/* //Contact Information------------------------------------------------------------------------------ */}


                <VStack space="4">
                  <Box px="2" pt="4">
                    <HStack space={3} justifyContent="space-between">


                      <VStack>
                        <Text fontSize="lg" color="coolGray.800" bold>
                          Profile
                        </Text>
                        <Text color="darkgreen">
                          <AntDesign name="Safety" size={15} color="green" /> Safe and Secure .
                        </Text>
                      </VStack>


                      <Spacer />

                      <IconButton icon={<Icon as={Feather} name="edit" />} borderRadius="full" _icon={{
                        color: "orange.500",
                        size: "lg"
                      }} _hover={{
                        bg: "orange.600:alpha.20"
                      }} _pressed={{
                        bg: "orange.600:alpha.20",
                        _icon: {
                          name: "emoji-flirt"
                        },
                        _ios: {
                          _icon: {
                            size: "2xl"
                          }
                        }
                      }} _ios={{
                        _icon: {
                          size: "2xl"
                        }
                      }} />

                    </HStack>
                  </Box>
                  <Box px="2" pb="4">

                    <VStack>
                      <View style={styles.container}>

                        <View style={{ flexDirection: 'row', alignItems: 'center', padding: "2%" }}>
                          <Ionicons name="phone-portrait-outline" size={24} color={GlobalStyles.colors.thridFond} />
                          <Text style={styles.title}>{"  "}+91 7798121777</Text>
                          <Badge style={{ marginStart: "2%" }} colorScheme="success" alignSelf="center" borderRadius="15" variant="solid">Verified</Badge>

                        </View>

                        <View style={{ flexDirection: 'row', alignItems: 'center', padding: "2%" }}>
                          <Ionicons name="mail-open-outline" size={24} color={GlobalStyles.colors.thridFond} />
                          <Text style={styles.title}>{"  "}rohitkale@gmail.com</Text>

                        </View>


                        <View style={{ flexDirection: 'row', alignItems: 'center', padding: "2%" }}>
                          <Ionicons name="location-outline" size={24} color={GlobalStyles.colors.thridFond} />
                          <Text style={styles.title}>{"  "}Pune , Maharashtra</Text>

                        </View>

                        <View style={{ flexDirection: 'row', alignItems: 'center', padding: "2%" }}>
                          <Ionicons name="calendar-outline" size={24} color={GlobalStyles.colors.thridFond} />
                          <Text style={styles.title}>{"  "}28/03/1995</Text>

                        </View>

                        <View style={{ flexDirection: 'row', alignItems: 'center', padding: "2%" }}>
                          <Ionicons name="person-outline" size={24} color={GlobalStyles.colors.thridFond} />
                          <Text style={styles.title}>{"  "}Male</Text>

                        </View>

                      </View>
                    </VStack>


                  </Box>

                </VStack>


              </Box>

              {/* Others------------------------------------------------------------- */}
              <Box border="8" px="2" borderRadius="lg" backgroundColor="white" style={{ marginTop: 5, width: "95%" }}>
                <VStack space="4">
                  <Box px="2" pt="4">
                    <HStack space={3} justifyContent="space-between">


                      <VStack>
                        <Text fontSize="lg" color={GlobalStyles.colors.primaryFond} bold>
                          Notifications
                        </Text>
                        <Text color="darkgreen">
                          <Ionicons name="happy-outline" size={17} color="green" /> Control your Notifications
                        </Text>
                      </VStack>


                      <Spacer />


                    </HStack>
                  </Box>
                  <Box px="2" pb="2" >
                    <VStack >
                      <View style={styles.container}>
                        <TouchableOpacity
                          style={styles.card}
                          onPress={() => setIsBottomDrawerVisible1(true)}
                        >

                          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Ionicons name="logo-whatsapp" size={24} color="green" />
                            <Text style={styles.title}>{"  "}Whatsapp</Text>
                            <BottomScreenDrawer isVisible={isBottomDrawerVisible1} content={isToggleOn1 ? contentSectionON : contentSectionOFF} onClose={handleCloseBottomDrawer1} handleClick={handleToggleChange1} buttonText={isToggleOn1 ? "Switch OFF Notifications" : "Switch ON Notifications"} heading={"Whatsapp Notifications!"} />


                            <View style={{ flex: 1, alignItems: 'flex-end' }}>
                              <Text style={{ paddingBottom: "1%", color: GlobalStyles.colors.thridFond }}>{isToggleOn1 ? "  ON" : "  OFF"}</Text>

                            </View>
                            <View style={{ flex: 0, alignItems: 'flex-end' }}>
                              <Ionicons name="chevron-forward-outline" size={24} color={GlobalStyles.colors.thridFond} />
                            </View>
                          </View>
                        </TouchableOpacity>
                        <Divider style={{ marginStart: "10%", width: '95%' }} my="1" _light={{
                          bg: "muted.200"
                        }} _dark={{
                          bg: "muted.500"
                        }} />
                        <TouchableOpacity
                          style={styles.card}
                          onPress={() => setIsBottomDrawerVisible2(true)}
                        >
                          <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                            <Ionicons name="mail-unread-outline" size={24} color={GlobalStyles.colors.thridFond} />
                            <Text style={styles.title}>{"  "}Email</Text>
                            <BottomScreenDrawer isVisible={isBottomDrawerVisible2} content={isToggleOn2 ? contentSectionOFF : contentSectionON} onClose={handleCloseBottomDrawer2} buttonText={isToggleOn2 ? "Switch OFF Notifications" : "Switch ON Notifications"} handleClick={handleToggleChange2} heading={"Email Notifications!"}/>

                            <View style={{ flex: 1, alignItems: 'flex-end' }}>
                              <Text style={{ paddingBottom: "1%", color: GlobalStyles.colors.thridFond }}>{isToggleOn2 ? "  ON" : "  OFF"}</Text>

                            </View>

                            <View style={{ flex: 0, alignItems: 'flex-end' }}>
                              <Ionicons name="chevron-forward-outline" size={24} color={GlobalStyles.colors.thridFond} />
                            </View>


                          </View>
                        </TouchableOpacity>
                        <Divider style={{ marginStart: "10%", width: '95%' }} my="1" _light={{
                          bg: "muted.200"
                        }} _dark={{
                          bg: "muted.500"
                        }} />

                        <TouchableOpacity
                          style={styles.card}
                          onPress={() => setIsBottomDrawerVisible3(true)}
                        >
                          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Ionicons name="megaphone-outline" size={24} color={GlobalStyles.colors.thridFond} />
                            <Text style={styles.title}>{"  "}Push Notifications</Text>
                            <BottomScreenDrawer isVisible={isBottomDrawerVisible3} content={isToggleOn3 ? contentSectionOFF : contentSectionON} onClose={handleCloseBottomDrawer3} buttonText={isToggleOn3 ? "Switch OFF Notifications" : "Switch ON Notifications"} handleClick={handleToggleChange3}  heading={"Push Notifications!"}/>

                            <View style={{ flex: 1, alignItems: 'flex-end' }}>
                              <Text style={{ paddingBottom: "1%", color: GlobalStyles.colors.thridFond }}>{isToggleOn3 ? "  ON" : "  OFF"}</Text>
                            </View>
                            <View style={{ flex: 0, alignItems: 'flex-end' }}>
                              <Ionicons name="chevron-forward-outline" size={24} color={GlobalStyles.colors.thridFond} />
                            </View>
                          </View>
                        </TouchableOpacity>


                      </View>

                    </VStack>

                  </Box>


                </VStack>

              </Box>




              {/* Others------------------------------------------------------------- */}
              <Box border="8" px="2" borderRadius="lg" backgroundColor="white" style={{ marginTop: 5, width: "95%", marginBottom: "40%" }}>
                <VStack space="4">
                  <Box px="2" pt="4">
                    <HStack space={3} justifyContent="space-between">


                      <VStack>
                        <Text fontSize="lg" color={GlobalStyles.colors.primaryFond} bold>
                          More
                        </Text>
                        <Text color="darkgreen">
                          <Ionicons name="happy-outline" size={17} color="green" /> All about your account
                        </Text>
                      </VStack>


                      <Spacer />


                    </HStack>
                  </Box>
                  <Box px="2" pb="2" >
                    <VStack >
                      <View style={styles.container}>
                        <TouchableOpacity
                          style={styles.card}
                          onPress={() => navigation.navigate('About')}
                        >

                          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Ionicons name="information-circle-outline" size={24} color={GlobalStyles.colors.thridFond} />
                            <Text style={styles.title}>{"  "}About</Text>

                            <View style={{ flex: 1, alignItems: 'flex-end' }}>
                              <Ionicons name="chevron-forward-outline" size={24} color={GlobalStyles.colors.thridFond} />
                            </View>
                          </View>
                        </TouchableOpacity>
                        <Divider style={{ marginStart: "10%", width: '95%' }} my="1" _light={{
                          bg: "muted.200"
                        }} _dark={{
                          bg: "muted.500"
                        }} />
                        <TouchableOpacity
                          style={styles.card}
                          onPress={() => navigation.navigate('Feedback')}
                        >
                          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Ionicons name="create-outline" size={24} color={GlobalStyles.colors.thridFond} />
                            <Text style={styles.title}>{"  "}Send Feedback</Text>
                            <View style={{ flex: 1, alignItems: 'flex-end' }}>
                              <Ionicons name="chevron-forward-outline" size={24} color={GlobalStyles.colors.thridFond} />
                            </View>
                          </View>
                        </TouchableOpacity>
                        <Divider style={{ marginStart: "10%", width: '95%' }} my="1" _light={{
                          bg: "muted.200"
                        }} _dark={{
                          bg: "muted.500"
                        }} />

                        <TouchableOpacity
                          style={styles.card}
                          onPress={() => navigation.navigate('Report Damage')}
                        >
                          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Ionicons name="alert-circle-outline" size={24} color={GlobalStyles.colors.thridFond} />
                            <Text style={styles.title}>{"  "}Report Damage</Text>
                            <View style={{ flex: 1, alignItems: 'flex-end' }}>
                              <Ionicons name="chevron-forward-outline" size={24} color={GlobalStyles.colors.thridFond} />
                            </View>
                          </View>
                        </TouchableOpacity>
                        <Divider style={{ marginStart: "10%", width: '95%' }} my="1" _light={{
                          bg: "muted.200"
                        }} _dark={{
                          bg: "muted.500"
                        }} />


                        <TouchableOpacity
                          style={styles.card}
                          onPress={logout_function}

                        >
                          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Ionicons name="log-out-outline" size={24} color={GlobalStyles.colors.thridFond} />
                            <Text style={styles.title}>{"  "}Logout</Text>
                            <View style={{ flex: 1, alignItems: 'flex-end' }}>
                              <Ionicons name="chevron-forward-outline" size={24} color={GlobalStyles.colors.thridFond} />
                            </View>
                          </View>
                        </TouchableOpacity>
                      </View>

                    </VStack>

                  </Box>


                </VStack>

              </Box>


            </VStack>



          </ScrollView>



        </NativeBaseProvider>




      </NavigationContainer>




    </>

  )



}

const styles = StyleSheet.create({

  container: {

    paddingTop: "1%",
    width: '100%'

  },
  parent: {

    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  navigator: {
    flex: 1,
    height: '60%',
  },
  card: {
    width: '100%',
    padding: "2%",
  },
  card1: {
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    marginBottom: 5,
    padding: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
    flexDirection: 'row',
    justifyContent: 'space-between'

  },
  title: {
    fontSize: 15,
    color: GlobalStyles.colors.secondaryFond,
  },

});

export default ProfileScreen;