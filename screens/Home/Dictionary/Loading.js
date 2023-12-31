import { View, Text } from "react-native";
import React from "react";
import LottieView from "lottie-react-native";

const Loading = () => {
  return (
    <View
      style={{
        marginTop: 10,
        width: "100%",
        height: "100%",
        backgroundColor: "#fff",
      }}
    >
      <LottieView
        style={{
          position: "absolute",
          width: "100%",
          top: 100,
        }}
        source={require("./animations/loading.json")}
        autoPlay={true}
        loop={true}
      />
      <Text
        style={{
          fontSize: 16,
          position: "absolute",
          top: "53%",
          left: "36.5%",
        }}
      >
        Fetching data
      </Text>
    </View>
  );
};

export default Loading;
