import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  ImageBackground,
} from "react-native";
import React from "react";
import quickfood from "../data/quickfood";
import { MaterialIcons } from "@expo/vector-icons";

const QuickFood = () => {
  const data = quickfood;
  return (
    <View style={{ marginTop: 10 , marginLeft:5 }}>
      <Text style={{ fontSize: 16, fontWeight: "500",marginLeft: 10 }}>Latest assignments</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {data.map((item, index) => (
          <Pressable style={{ margin: 10 }} key={index}>
            <ImageBackground
              imageStyle={{ borderRadius: 6 }}
              style={{ aspectRatio: 5 / 6, height: 170 }}
              source={{ uri: item.image }}
            >
              <Text
                style={{
                  position: "absolute",
                  bottom: 10,
                  left: 10,
                  fontSize: 27,
                  fontWeight: "900",
                  color: "white",
                }}
              >
                {item.offer} 
              </Text>
            </ImageBackground>
            <Text style={{ marginTop: 10, fontSize: 16, fontWeight: "500" }}>
              {item.name}
            </Text>
            <View style={{flexDirection:"row",alignItems:"center",marginTop:3}}>
              <MaterialIcons name="stars" size={24} color="green" />
              <Text style={{marginLeft:3,fontSize:15,fontWeight:"400"}}>{item.rating}</Text>
              <Text style={{marginLeft:3}}>•</Text>
              <Text style={{marginLeft:3,fontSize:15,fontWeight:"400"}}>{item.time} Views</Text>
            </View>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
};

export default QuickFood;

const styles = StyleSheet.create({});
