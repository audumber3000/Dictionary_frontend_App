import React, { useState, useRef, useEffect, useContext } from "react";
import {
  StyleSheet,
  View,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import SearchComp from "../../components/HomeScreenComp/SearchComp";
import CardComp from "../../components/HomeScreenComp/CardComp1";
import CardComp2 from "../../components/HomeScreenComp/CardComp2";
import Fontisto from "react-native-vector-icons/Fontisto";
import { useNavigation } from "@react-navigation/native";
import RBSheet from "react-native-raw-bottom-sheet";
import * as Contacts from "expo-contacts";
import axios from "axios";

import SlideAlert from "../../components/TostMessage/SlideAlert";
import PopularCards from "../../components/HomeScreenComp/PopularCard/PopularCards";
import { AuthContext } from "../../store/auth-context";

export default function HomeScreen() {
  const [apiData, setapiData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refRBSheet = useRef();
  const navigation = useNavigation();

  const context = useContext(AuthContext);
  console.log(context.token);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://dictionarybackendapp-production.up.railway.app/v1/wordifyme/home/653a65f6113cf91090bf6192",
          {
            headers: {
              Authorization: `Bearer ${context.token}`,
            },
          }
        );

        if (!response.data || !response.data.data) {
          throw new Error("Invalid response data");
        }

        setapiData(response.data.data);
        console.log(response.data.data);
        // console.log(apiData);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [context.token]);

  const renderContent = () => {
    if (loading) {
      return <ActivityIndicator size="large" color="#FFFFFF" />;
    }

    if (error) {
      return <Text>Error: {error}</Text>;
    }
    
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      horizontal={false}
      contentContainerStyle={{ minHeight: "100%" }}
    >
      <View style={styles.container}>
        <View style={styles.profileImage}>
          <Image
            style={styles.profileImage}
            source={require("../../assets/profile.png")}
          />
        </View>
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => navigation.navigate("Notification")}
          style={styles.bellIcon}
        >
          <Fontisto name="bell-alt" size={40} color={"white"} />
          {apiData.length > 0 && apiData[0].totalWords > 0 && (
            <View style={styles.notificationBadge}>
              <Text style={styles.notificationText}>
                {apiData[0].totalWords}
              </Text>
            </View>
          )}
        </TouchableOpacity>
        <Image
          style={styles.backgroundImage}
          source={require("../../assets/wave1.png")}
        />

        <SearchComp />
        <View style={styles.cardcontainer}>
          <CardComp apiData={apiData}/>
          <PopularCards apiData={apiData}/>
          <CardComp2 apiData={apiData}/>
          {/* <CardComp2 /> */}
        </View>

        {/* bottom drawer */}
        <RBSheet
          ref={refRBSheet}
          height={550}
          openDuration={250}
          closeOnDragDown={true}
          closeOnPressMask={false}
          customStyles={{
            wrapper: {
              backgroundColor: "rgba(0,0,0,0.8)", // Adjust the opacity as needed
            },
            draggableIcon: {
              backgroundColor: "grey",
            },
            container: {
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
            },
          }}
        >
          {/* Implement your ContactPermission component here */}
        </RBSheet>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#A678F2",
    flexDirection: "column",
  },
  backgroundImage: {
    position: "absolute",
    top: 120,
    left: 0,
    width: "100%",
    height: 270,
  },
  bellIcon: {
    position: "absolute",
    top: 60,
    right: 10,
  },
  profileImage: {
    position: "absolute",
    top: 30,
    left: 10,
    height: 45,
    width: 45,
    borderRadius: 20,
  },
  cardcontainer: {
    backgroundColor: "white",
    width: "100%",
    height: "100%",
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    paddingBottom: 80,
  },
  notificationBadge: {
    position: "absolute",
    top: 5,
    right: 2,
    backgroundColor: "red",
    borderRadius: 8,
    paddingHorizontal: 5,
    paddingVertical: 1,
  },
  notificationText: {
    color: "white",
    fontWeight: "bold",
  },
});
