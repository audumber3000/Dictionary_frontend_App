import { View, Text, ScrollView, Image } from "react-native";
import React from "react";
import PopularCard1 from "./PopularCard1";

const PopularCards = () => {
  return (
    <View
      style={{
        width: "100%",
        paddingLeft: 15,
        paddingRight: 15,
        marginTop: 15,
      }}
    >
      {/* Popular Heading */}
      <View>
        <Text
          style={{
            fontSize: 24,
            fontWeight: "600",
            color: "#263238",
            opacity: 0.7,
          }}
        >
          Popular
        </Text>
      </View>

      {/* Horizontal sliding cards */}
      <View style={{ width: "100%" }}>
        <ScrollView
          horizontal
          contentContainerStyle={{ marginTop: 15, gap: 16 }}
        >
          {/* Card code */}
          <PopularCard1
            cardImage={require("../assets/popular_1.png")}
            cardText={"Unstop's Creative Hackathon"}
            isLatest={true}
            views={"5,800"} // One card has user views
          />
          <PopularCard1
            cardImage={require("../assets/popular_2.png")}
            cardText={"Masterclass: Solving Business Strategy Cases"}
            isLatest={false}
            views={"2,600"}
          />
          <PopularCard1
            cardImage={require("../assets/popular_1.png")}
            cardText={"Unstop's Creative Hackathon"}
            isLatest={true}
            views={"5,800"}
          />
          <PopularCard1
            cardImage={require("../assets/popular_2.png")}
            cardText={"Masterclass: Solving Business Strategy Cases"}
            isLatest={false}
            views={"2,600"}
          />
        </ScrollView>
      </View>
    </View>
  );
};

export default PopularCards;
