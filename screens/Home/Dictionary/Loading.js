import { View, Text } from "react-native";
import React from "react";
import LottieView from "lottie-react-native";
import { Spinner } from "native-base";

const Loading = () => {
  return (
    <View
      style={{
        marginTop: 10,
        width: "100%",
        height: "100%",
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View>
        <Spinner size={"xl"} color={"#8F6ACD"} />
        <Text>Fetching data</Text>
      </View>
    </View>
  );
};

export default Loading;
