import React, { useRef, useEffect, useState, useContext } from "react";
import { Pressable, StyleSheet, Text, Image, View, ImageBackground } from "react-native"; // Import ImageBackground
import RBSheet from "react-native-raw-bottom-sheet";
import Icon from 'react-native-vector-icons/FontAwesome';
import { AuthContext } from "../../store/auth-context";
import { useNavigation } from "@react-navigation/native";
import { signin_with_google } from "../../api/auth";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
import { TouchableRipple } from 'react-native-paper';

WebBrowser.maybeCompleteAuthSession();

const LoginOptions = () => {
    const navigation = useNavigation();
    const authCtx = useContext(AuthContext);

    const [token, setToken] = useState("");
    const [userInfo, setUserInfo] = useState(null);

    const [request, response, promptAsync] = Google.useAuthRequest({
        androidClientId: "886878491301-3l5cesi8giepfpunu592gj7o9t6n4b19.apps.googleusercontent.com",
        iosClientId: "886878491301-edq8q2n3tp747f63tgmb7fithlmn73in.apps.googleusercontent.com",
        webClientId: "886878491301-acc2qkks9l0aag6vo9gf39phtbp53c6k.apps.googleusercontent.com",
    });

    const refRBSheet = useRef();

    useEffect(() => {
        refRBSheet.current.open();
        handleEffect();
    }, [response, token]);

    const handleEffect = async () => {
        const user = await getLocalUser();
        await AsyncStorage.removeItem("user");
        console.log("user", user);
        if (!user) {
            if (response?.type === "success") {
                console.log(response);
                getUserInfo(response.authentication.accessToken);
            }
        } else {
            setUserInfo(user);
            console.log("loaded locally");
        }
    };

    const getLocalUser = async () => {
        const data = await AsyncStorage.getItem("@user");
        if (!data) return null;
        return JSON.parse(data);
    };

    const getUserInfo = async (token) => {
        if (!token) {
            console.warn("No valid token available.");
            return;
        }

        try {
            const response = await fetch(
                "https://www.googleapis.com/userinfo/v2/me",
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            const user = await response.json();
            console.log("Google User : ", user);
            console.log("After Save User Info Locally...");
            setUserInfo(user);
            handleUserLogin(user);
        } catch (error) {
            console.error("Error fetching user info:", error);
        }
    };

    const handleUserLogin = async (user) => {
        await AsyncStorage.setItem('name', user.name);
        await AsyncStorage.setItem('email', user.email);

        const data = await signin_with_google(user.email);
        console.log(data);
        if (data.code === 200) {
            navigation.navigate("TopTab");
        } else if (data.code === 201) {
            authCtx.authenticate(data.token.access.token);
            authCtx.authenticateUserId(data.data._id);
            navigation.navigate("Dev");
        } else {
            console.log("Something went wrong with GoogleSignIn");
        }
    };

    const handleLoginWithPhone = () => {
        refRBSheet.current.close();
        navigation.navigate("Login");
    };

    const handleLoginWithGoogle = async () => {
        refRBSheet.current.close();
        try {
            await AsyncStorage.removeItem("@user");
            const result = await promptAsync();
            console.log("Google Auth Result:", result);

            if (result.type === "success") {
                const { authentication, params, url } = result;
                console.log("Authentication details:", authentication);
                console.log("Params:", params);
                console.log("URL:", url);

                // If you want to display this information in your UI, you can set it to state variables
                // setToken(authentication.accessToken);
                // setUserInfo(authentication.accessToken);
            } else if (result.type === "cancel") {
                console.warn("Authentication cancelled by user.");
            } else {
                console.error("Unknown result type:", result);
            }
        } catch (error) {
            console.error("Error during Google login:", error);
        }
    };

    return (
        <ImageBackground
            source={require('../../assets/Login_Wallpaper.png')} // Use the local image path
            style={{ flex: 1, justifyContent: "center", alignItems: "center", height: 450, width: 'auto', marginTop: "20px" }}
        >
            <RBSheet
                ref={refRBSheet}
                height={260}
                openDuration={250}
                closeOnDragDown={true}
                closeOnPressMask={false}
                customStyles={{
                    wrapper: { backgroundColor: "transparent" },
                    draggableIcon: { backgroundColor: "#D3D3D3" },
                    container: { borderTopLeftRadius: 10, borderTopRightRadius: 10 , backgroundColor: 'rgba(106, 13, 173, 1)' },
                }}
            >
                <View style={{
                    flex: 1,
                    padding: 20,
                    justifyContent: 'center',

                }}>
                    <TouchableRipple
                        style={[styles.button, { borderWidth: 3, borderColor: 'white', flexDirection: 'row', alignItems: 'center' }]}
                        onPress={handleLoginWithPhone}
                    >
                        <>
                            <Icon name="phone" size={30} color="white" style={{ marginRight: 10 }} />
                            <View style={{ height: 40, width: 2, backgroundColor: 'white', marginVertical: 5 }} />
                            <Text style={styles.btntxt}> Continue With Phone</Text>
                        </>
                    </TouchableRipple>

                    <Pressable style={styles.Googlebutton} onPress={handleLoginWithGoogle}>
                        <Image
                            source={require('../../assets/sign_in_with_google.jpg')}
                            style={{
                                width: "100%",
                                height: "100%",
                                resizeMode: "cover",
                                borderRadius: 8,
                            }}
                        />
                    </Pressable>
                </View>
            </RBSheet>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: "#6A0DAD",
        height: 50,
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10,
        flexDirection: "row",
    },
    Googlebutton: {
        backgroundColor: "white",
        height: 50,
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 30,
    },
    btntxt: {
        fontSize: 28,
        fontWeight: "400",
        color: "white",
    },
});

export default LoginOptions;