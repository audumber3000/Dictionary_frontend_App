import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import TopCards from "../../components/LeaderBoardComp/TopCards";
import CurveContainer from "../../components/LeaderBoardComp/CurvContainer";

export default function LeadScreen1() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={{ alignItems: "flex-end", right: 10 }}>
        <Image
          style={styles.backgroundImage}
          source={require("../../assets/ellipse1.png")}
        />
      </View>
      <View style={{ alignItems: "flext-start", left: 80, bottom: 5 }}>
        <Image
          style={styles.backgroundImage}
          source={require("../../assets/ellipse2.png")}
        />
      </View>
      <View style={{ alignItems: "center", right: 80, top: 120 }}>
        <Image
          style={styles.backgroundImage}
          source={require("../../assets/ellipse4.png")}
        />
      </View>
      <View style={{ alignItems: "center", left: 80, top: 90 }}>
        <Image
          style={styles.backgroundImage}
          source={require("../../assets/ellipse6.png")}
        />
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        vertical={true}
        contentContainerStyle={styles.scrollview}
      >
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <Text style={styles.headtext}>Leader Board</Text>
          <View style={styles.navcard}>
            <View style={styles.background}>
              <Text style={{ color: "white", fontWeight: "900" }}>
                All time
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate("LeadScreen2")}
            >
              <Text style={{ right: 15, fontWeight: "900" }}>This week</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate("LeadScreen3")}
            >
              <Text style={{ fontWeight: "900" }}>Month</Text>
            </TouchableOpacity>
          </View>
          <TopCards />
          <CurveContainer />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#966DDA",
  },
  navcard: {
    width: 330,
    height: 45,
    backgroundColor: "white",
    borderRadius: 13,
    top: 70,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  headtext: {
    fontSize: 24,
    fontWeight: "900",
    color: "white",
    lineHeight: 30,
    letterSpacing: -0.32,
    top: 50,
    textAlign: "center",
  },
  background: {
    backgroundColor: "#966DDA",
    width: 109,
    height: 36,
    borderRadius: 11,
    alignItems: "center",
    justifyContent: "center",
    right: 25,
  },
  scrollview: { flexGrow: 1 },
  backgroundImage: {
    position: "absolute",
    top: 50,
  },
});
