import { View, Text, ScrollView } from "react-native";
import React from "react";
import PopularCard1 from "../PopularCard/PopularCard1";
import CompeteAndWinCard from "./CompeteAndWinCard";

const CompeteAndWin1 = () => {
  return (
    <View
      style={{
        width: "100%",
        paddingLeft: 15,
        paddingRight: 15,
        marginTop: 15,
      }}
    >
      {/* Compete and Win Heading */}
      <View>
        <Text
          style={{
            fontSize: 24,
            fontWeight: "600",
            color: "#263238",
            opacity: 0.7,
          }}
        >
          Compete and Win
        </Text>
      </View>

      {/* Horizontal sliding cards */}
      <View style={{ width: "100%" }}>
        <ScrollView
          horizontal
          contentContainerStyle={{ marginTop: 15, gap: 16 }}
        >
          {/* Card components here */}
          <CompeteAndWinCard
            backgroundId={1}
            cardLogo={require("../../../assets/Compete_Logo_1.png")}
            cardTitle1={"Monomousumi Monthl..."}
            cardTitle2={"Monomousumi"}
            type={"Offline"}
            users={"3,300"}
          />
          <CompeteAndWinCard
            backgroundId={2}
            cardLogo={require("../../../assets/Compete_Logo_2.png")}
            cardTitle1={"Intuit - Prepare for the..."}
            cardTitle2={"Intuit"}
            type={"Online"}
            users={"4,400"}
          />
          <CompeteAndWinCard
            backgroundId={1}
            cardLogo={require("../../../assets/Compete_Logo_1.png")}
            cardTitle1={"Monomousumi Monthl..."}
            cardTitle2={"Monomousumi"}
            type={"Offline"}
            users={"3,300"}
          />

          {/* <CompeteAndWinCard /> */}
        </ScrollView>
      </View>
    </View>
  );
};

export default CompeteAndWin1;
