import { View, Text, ScrollView } from "react-native";
import React from "react";
import PopularCard1 from "../PopularCard/PopularCard1";
import CompeteAndWinCard from "./CompeteAndWinCard";

const CompeteAndWin1 = (props) => {
    const { apiData } = props;

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
      <ScrollView horizontal contentContainerStyle={{ marginTop: 15, gap: 16 }}>
      {apiData.competitionData &&
        apiData.competitionData.map((competition, index) => (
          <CompeteAndWinCard
            key={index}
            backgroundId={competition.backgroundId || 1}
            cardLogo={competition.cardLogo || require("../../../assets/Compete_Logo_1.png")}
            cardTitle1={competition.text_heading || "Default Title"}
            cardTitle2={competition.cardTitle2 || "Monomousumi"}
            type={competition.type || "Offline"}
            users={competition.users || "3,300"}
          />
        ))}
    </ScrollView>
      </View>
    </View>
  );
};

export default CompeteAndWin1;
