import React, { useRef, useEffect, useState, useContext } from "react";
import { Pressable, StyleSheet, Text, Image, View } from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import Icon from 'react-native-vector-icons/FontAwesome';
import { AuthContext } from "../../store/auth-context";
import { useNavigation } from "@react-navigation/native";
import { signinWithGoogle } from "../../api/auth";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import AsyncStorage from "@react-native-async-storage/async-storage";

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

        if (!user && response?.type === "success") {
            setToken(response.authentication.accessToken);
            getUserInfo(response.authentication.accessToken);
        } else if (user) {
            handleUserLogin(user);
        }
    };

    const getLocalUser = async () => {
        const data = await AsyncStorage.getItem("@user");
        return data ? JSON.parse(data) : null;
    };

    const getUserInfo = async (token) => {
        if (!token) return;

        try {
            const response = await fetch(
                "https://dictionarybackendapp-production.up.railway.app/v1/auth/login/email",
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            const user = await response.json();
            await saveUserInfoLocally(user);
            handleUserLogin(user);
        } catch (error) {
            console.error("Error fetching user info:", error);
        }
    };

    const saveUserInfoLocally = async (user) => {
        await AsyncStorage.setItem("@user", JSON.stringify(user));
        await AsyncStorage.setItem('name', user.name);
        await AsyncStorage.setItem('email', user.email);
    };

    const handleUserLogin = async (user) => {
        setUserInfo(user);
        const data = await signinWithGoogle(user.email);

        if (data.code === 200) {
            navigation.navigate("TopTab");
        } else if (data.code === 201) {
            await authCtx.authenticate(data.token.access.token);
            navigation.navigate("Dev");
        } else {
            console.log("Something went wrong with GoogleSignIn");
        }
    };

    const handleLoginWithPhone = () => {
        refRBSheet.current.close();
        navigation.navigate("Login");
    };

    const handleLoginWithGoogle = async() => {
        refRBSheet.current.close();
        const result = await promptAsync()
        if (result.type === "success") {
            const { authentication } = result
            setToken(authentication.accessToken)
            setUserInfo(authentication.accessToken)
        }

    };

    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "grey" }}>
            <RBSheet
                ref={refRBSheet}
                height={300}
                openDuration={250}
                closeOnDragDown={true}
                closeOnPressMask={false}
                customStyles={{
                    wrapper: { backgroundColor: "transparent" },
                    draggableIcon: { backgroundColor: "grey" },
                    container: { borderTopLeftRadius: 10, borderTopRightRadius: 10 },
                }}
            >
                <View style={{ padding: 20 }}>
                    <Pressable style={styles.button} onPress={handleLoginWithPhone}>
                        <Icon name="phone" size={30} color="white" style={{ marginRight: 20 }} />
                        <Text style={styles.btntxt}>Continue With Phone</Text>
                    </Pressable>

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
        </View>
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
