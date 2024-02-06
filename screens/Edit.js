import React, { useState, useContext, useEffect } from "react";
import { View, StyleSheet, Text } from 'react-native';
import { Appbar, TextInput, Button, Banner, RadioButton } from 'react-native-paper';
import DatePicker from 'react-native-datepicker';
import DropDownPicker from 'react-native-dropdown-picker';
import { AuthContext } from "../store/auth-context";
import { profileAPI } from "../api/profileScreenAPI";
import { NavigationContainer, useNavigation } from "@react-navigation/native";

import ProfileScreen from "./ProfileScreen";
const Edit = () => {
    const [city, setCity] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [gender, setGender] = useState('');
    const navigation = useNavigation();

    const [data, setData] = useState([]);

    const { token } = useContext(AuthContext);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Retrieve token from AsyncStorage
                // const token = await AsyncStorage.getItem("token");

                if (!token) {
                    console.error("Token not found in AsyncStorage");
                    return;
                }

                const response = await profileAPI(token)   // profile page GET API
                const newData = response.data;
                setData(newData);
                // console.log(newData)
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <View style={styles.container}>
            <Appbar.Header>
            <Appbar.BackAction onPress={() => navigation.goBack()} />
                <Appbar.Content title="Edit Profile" />
            </Appbar.Header>

            <View style={styles.content}>
                <Banner visible={true} actions={[]} icon="information-outline">
                    Profile Completion {"\n"}
                    86%
                </Banner>

                <TextInput
                    label="Name"
                    value={data.name}
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
                    label="Ciry"
                    value={data.city}
                    onChangeText={(text) => setCity(text)}
                    style={styles.input}
                />

                <View style={styles.datePickerContainer}>
                    <Text>Date of Birth</Text>
                    <DatePicker
                        style={styles.datePicker}
                        date={dateOfBirth}
                        mode="date"
                        placeholder="Select date"
                        format="YYYY-MM-DD"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        customStyles={{
                            dateIcon: {
                                position: 'absolute',
                                left: 0,
                                top: 4,
                                marginLeft: 0,
                            },
                            dateInput: {
                                marginLeft: 36,
                            },
                        }}
                        onDateChange={(date) => setDateOfBirth(date)}
                    />
                </View>

                <View style={styles.genderContainer}>
                    <Text>Gender</Text>
                    <RadioButton.Group
                        onValueChange={(value) => setGender(value)}
                        value={gender}
                    >
                        <RadioButton.Item label="Male" value="male" />
                        <RadioButton.Item label="Female" value="female" />
                    </RadioButton.Group>
                </View>

                <Button mode="contained" onPress={() => console.log('Save pressed')}>
                    Save
                </Button>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        padding: 16,
    },
    input: {
        marginVertical: 8,
    },
    datePickerContainer: {
        marginVertical: 8,
    },
    datePicker: {
        width: '100%',
    },
    genderContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 8,
    },
});

export default Edit;
