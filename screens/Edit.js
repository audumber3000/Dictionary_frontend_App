import React, { useState, useContext, useEffect } from "react";
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ScrollView } from 'react-native';

import { View, StyleSheet, Text } from 'react-native';
import { Appbar, TextInput, Button, Banner, RadioButton } from 'react-native-paper';
import { DatePickerInput } from 'react-native-paper-dates';
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../store/auth-context";
import { profileAPI, updateUserAPI } from "../api/profileScreenAPI";
import { base_url } from "../utils/constants";
const Edit = () => {
    const [city, setCity] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [gender, setGender] = useState('');
    const [name, setName] = useState('');
    const [data, setData] = useState([]);
    const navigation = useNavigation();
    const { token } = useContext(AuthContext);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (!token) {
                    console.error("Token not found");
                    return;
                }

                const response = await profileAPI(token);
                const newData = response.data;
                setData(newData);
                setName(newData.name);
                setGender(newData.gender); // Set the gender state
                setDateOfBirth(newData.dob); // Set the dateOfBirth state
                setCity(newData.address)
                console.log(newData);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [token]);

    const handleSave = async () => {
        let updatedData; // Declare updatedData outside the try block
        const selectedDate = dateOfBirth instanceof Date ? dateOfBirth : new Date(dateOfBirth);

        const formattedDate = `${selectedDate.getMonth() + 1}/${selectedDate.getDate()}/${selectedDate.getFullYear()}`;
        try {
            updatedData = {
                dob: formattedDate,
                gender: gender,
                address: city,
            };

            // Replace 'userId' with the actual user ID
            const userid = await AsyncStorage.getItem('userid')

            const response = await updateUserAPI(userid, updatedData, token);
            addToFavorites

            if (response.status === 200) {
                console.log('Data updated successfully');
                // You can navigate to another screen or perform other actions after successful update
            } else {
                console.error('Failed to update data:', response.statusText);
                console.log(updatedData);
            }
        } catch (error) {
            console.error('Error updating data:', error);
            console.log(updatedData); // Now this should not throw a ReferenceError
        }
    };



    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={{ paddingHorizontal: 1 }}>
            <Appbar.Header style={styles.appBar}>
                    <Appbar.BackAction onPress={() => navigation.goBack()} />
                    <Text style={styles.heading}>Edit Profile</Text>
                </Appbar.Header>

                <View style={styles.content}>
                    <Banner visible={true} actions={[]} icon="information-outline">
                        Profile Completion {"\n"}
                        86%
                    </Banner>

                    <TextInput
                        label="Name"
                        value={name}
                        disabled
                        onChangeText={(text) => setName(text)}
                        style={styles.input}
                    />
                    <TextInput
                        label="Mobile Number"
                        value={data.contact}
                        disabled
                        style={styles.input}
                    />                       
                    <TextInput
                        label="Email"
                        value={data.email}
                        disabled
                        style={styles.input}
                    />
                    <TextInput
                        label="City"
                        value={city}
                        onChangeText={(text) => setCity(text)}
                        style={styles.input}
                    />
                    <View style={styles.datePickerContainer}>
                        <DatePickerInput
                            label="Date of Birth"
                            locale="en"
                            value={null}
                            onChange={(d) => setDateOfBirth(d)}
                            inputMode="start"
                        />
                    </View>
                    <View style={styles.genderContainer}>
                        <Text>Gender</Text>
                        <View style={styles.radioButtonContainer}>
                            <RadioButton.Group
                                onValueChange={(value) => setGender(value)}
                                value={gender}
                            >
                                <View style={styles.radioButtonItem}>
                                    <RadioButton.Item label="Male" value="male" />
                                    <RadioButton.Item label="Female" value="female" />
                                </View>
                            </RadioButton.Group>

                        </View>
                    </View>

                    <Button mode="contained" onPress={handleSave} style={{backgroundColor:'#A678F2'}}>
                        Save
                    </Button>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    heading: {
        padding: 20,
        // marginTop: 60,
        fontSize: 30,
        color: "#fff",
        fontWeight: "bold", // Make the font bold
      },
    container: {
        flex: 1,
    },
    input: {
        marginVertical: 8,
    },
    datePickerContainer: {
        marginVertical: 8,
    },
    genderContainer: {
        flexDirection: 'row', // Set flexDirection to 'row' for horizontal alignment
        marginVertical: 8
    },
    radioButtonContainer: {
        flexDirection: 'row',
        marginLeft: 10,
    },

    radioButtonItem: {
        flexDirection: 'row',
        marginRight: 10, // Add some margin between radio buttons if needed
    },
    appBar: {
        backgroundColor: '#A678F2',
        height: 80, // Set the desired height for the header
      },
    content: {
        padding: 16,
    },
});

export default Edit;