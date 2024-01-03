import { StyleSheet, Text, View, ScrollView, Image } from "react-native";
import React, { useState, useEffect } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { leaderBoard } from "../../api/LeaderBoardAPI";

export default function CurveContainer() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await AsyncStorage.getItem("token");

        if (!token) {
          console.error("Token not found in AsyncStorage");
          return;
        }
        const response = await leaderBoard(token);
        const newData = response.data.data;
        setData(newData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <View style={styles.curvecontainer}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={true}
        horizontal={false}
      >
        <View style={{ marginBottom: 210 }}>
          {data.slice(3, 12).map((item) => (
            <View key={item._id} style={styles.listcard}>
              <View
                style={{
                  alignItems: "flex-start",
                  justifyContent: "flex-start",
                  flexDirection: "row",
                }}
              >
                <Text
                  style={{
                    left: 10,
                    top: 20,
                    fontSize: 15,
                    fontWeight: "bold",
                  }}
                >
                  {item.userId}
                </Text>
                <Image
                  style={styles.cardimage}
                  source={{
                    uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEyq_jXOpPcM7SXHtyI8E8sa8HDZX358Sgxw&usqp=CAU",
                  }}
                />

                <Text
                  style={{
                    left: 230,
                    top: 25,
                    color: "#966DDA",
                    fontSize: 12,
                    fontWeight: "bold",
                  }}
                >
                  {item.score}
                </Text>
                <Text
                  style={{
                    left: 40,
                    top: 25,
                    fontSize: 15,
                    fontWeight: "900",
                  }}
                >
                  {item.name}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  curvecontainer: {
    width: "200%",
    flex: 1,
    top: 140,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    borderTopLeftRadius: 450,
    borderTopRightRadius: 450,
    opacity: 0.99,
  },
  listcard: {
    top: 60,
    backgroundColor: "white",
    width: 360,
    height: 64,
    marginBottom: 15,
    borderRadius: 7,
    elevation: 3,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 7,
  },
  cardimage: {
    height: 46,
    width: 46,
    left: 40,
    borderRadius: 25,
    top: 10,
  },
});
