import {
  View,
  Text,
  Image,
  Pressable,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Shadow } from "react-native-shadow-2";

const PopularCard1 = ({ cardImage, cardText, isLatest, views }) => {

  const baseFontSize = 16;

  return (
    <TouchableOpacity>
      <Shadow distance={2} containerStyle={{ marginLeft: 1 }}>
        <View
          style={{
            width: 170,
            height: 180,
            borderBottomColor: "red",
            marginBottom: 1,
            borderRadius: 5,
          }}
        >
          {/* Image */}
          <View style={{ width: "100%", height: 97 }}>
            <ImageBackground
              // width={"100%"}
              // height={"100%"}
              source={cardImage}
              resizeMode="cover"
              style={{flex: 1}}
            ></ImageBackground>
          </View>
          {/* Text */}
          <View style={{ paddingLeft: 5, paddingRight: 5, height: 83 }}>
            <View
              style={{
                display: "flex",
                flexWrap: "wrap",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "flex-start",
                paddingTop: 5,
              }}
            >
              <View style={{ flex: 1 }}>
                <Text style={{ color: "#263238", fontSize: baseFontSize*0.85 }}>
                  {cardText.length > 40
                    ? cardText.substr(0, 40) + "..."
                    : cardText}
                </Text>
              </View>
              {isLatest && (
                <View
                  style={{
                    padding: 4,
                    backgroundColor: "#BFF9D1",
                    borderRadius: 0.6,
                  }}
                >
                  <Text style={{ fontSize: baseFontSize * 0.6 }}>🎉 Latest</Text>
                </View>
              )}
            </View>
            {/* Bottom Text */}
            <View
              style={{
                position: "absolute",
                bottom: 5,
                paddingLeft: 10,
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Ionicons
                style={{ right: 5, color: "#263238" }}
                name="eye-outline"
                size={20}
              />

              <Text style={{ fontSize: baseFontSize * 0.75, color: "#333333", fontWeight: 500 }}>
                {views}
              </Text>
              <Text style={{ color: "#595959", fontSize: baseFontSize * 0.75 }}>
                &nbsp;&nbsp;Views
              </Text>
            </View>
          </View>
        </View>
      </Shadow>
    </TouchableOpacity>
  );
};

export default PopularCard1;
