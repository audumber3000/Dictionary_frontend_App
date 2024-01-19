import { View, Text, ScrollView, Image } from "react-native";
import React from "react";
import PopularCard1 from "./PopularCard1";

const PopularCards = (props) => {
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
          {apiData.PopularWordCategory && apiData.PopularWordCategory[0] && (
          <PopularCard1
            cardImage={apiData.PopularWordCategory? apiData.PopularWordCategory[0].image : "https://d3nn873nee648n.cloudfront.net/900x600/20732/300-SM1072581.jpg"}
            cardText={apiData.PopularWordCategory ? apiData.PopularWordCategory[0].name : "Unstop's Creative Hackathon"}
            isLatest={true}
            views={"5,800"} // One card has user views
            apiData={apiData.PopularWordCategory ? apiData.PopularWordCategory[0].wordsList : null}
          />
          )}
          {apiData.PopularWordCategory && apiData.PopularWordCategory[1] && (
          <PopularCard1
            cardImage={apiData.PopularWordCategory? apiData.PopularWordCategory[1].image : "https://d3nn873nee648n.cloudfront.net/900x600/20732/300-SM1072581.jpg"}
            cardText={apiData.PopularWordCategory? apiData.PopularWordCategory[1].name : "Unstop's Creative Hackathon"}
            isLatest={true}
            views={"5,800"} // One card has user views
            apiData={apiData.PopularWordCategory ? apiData.PopularWordCategory[1].wordsList : null}
          />
          )}
        </ScrollView>
      </View>
    </View>
  );
};

export default PopularCards;
