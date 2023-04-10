import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  Dimensions,
  Image,
  ImageBackground,
} from "react-native";
import React from "react";
import quickfood from "../data/quickfood";
import { MaterialIcons } from "@expo/vector-icons";

const numColumns = 3;
const screenWidth = Dimensions.get('window').width;
const imageWidth = screenWidth / numColumns;

const QuickFood = () => {
  const types = [
    {
      id: "0",
      image: "https://res.cloudinary.com/education4ol/image/upload/v1679779976/Laundry%20Icons/6.png",
      name: "Donate Clothes",
    },
    {
      id: "1",
      image: "https://res.cloudinary.com/education4ol/image/upload/v1679779978/Laundry%20Icons/7.png",
      name: "Blankets"
    },
    {
      id: "2",
      image: "https://res.cloudinary.com/education4ol/image/upload/v1679779977/Laundry%20Icons/8.png",
      name: "Others"
    },
    
   


  ]

  //const data = quickfood;
  return (
    // <View style={{ marginTop: 10 , marginLeft:5 }}>
    //   <Text style={{ fontSize: 16, fontWeight: "500",marginLeft: 10 }}>Latest assignments</Text>
    //   <ScrollView horizontal showsHorizontalScrollIndicator={false}>
    //     {data.map((item, index) => (
    //       <Pressable style={{ margin: 10 }} key={index}>
    //         <ImageBackground
    //           imageStyle={{ borderRadius: 6 }}
    //           style={{ aspectRatio: 5 / 6, height: 170 }}
    //           source={{ uri: item.image }}
    //         >
    //           <Text
    //             style={{
    //               position: "absolute",
    //               bottom: 10,
    //               left: 10,
    //               fontSize: 27,
    //               fontWeight: "900",
    //               color: "white",
    //             }}
    //           >
    //             {item.offer} 
    //           </Text>
    //         </ImageBackground>
    //         <Text style={{ marginTop: 10, fontSize: 16, fontWeight: "500" }}>
    //           {item.name}
    //         </Text>
    //         <View style={{flexDirection:"row",alignItems:"center",marginTop:3}}>
    //           <MaterialIcons name="stars" size={24} color="green" />
    //           <Text style={{marginLeft:3,fontSize:15,fontWeight:"400"}}>{item.rating}</Text>
    //           <Text style={{marginLeft:3}}>•</Text>
    //           <Text style={{marginLeft:3,fontSize:15,fontWeight:"400"}}>{item.time} Views</Text>
    //         </View>
    //       </Pressable>
    //     ))}
    //   </ScrollView>
    // </View>

    <View style={{ marginTop: 15 , marginLeft:5 }}>
      
      <Text style={{ fontSize: 16, fontWeight: "700",marginLeft: 10 , color:"#09458C" }}>Donation For Cause</Text>

          <View style={styles.container}>
            {types.map((item, index) => (

              <View style={{ margin: 6, width: "21%", alignItems: "center" }} key={index}>
                <Pressable android_ripple={{ color: "#ccc", radius: 28, }} >
                  <Image source={{ uri: item.image }} style={{ width: 50, height: 50, borderRadius: 5, transform: [{ scale: 1.1 }] }} />
                </Pressable>
                <Text style={{ marginTop: 6, textAlign: "center" }}>{item.name}</Text>

              </View>

            ))}
          </View>
          </View>
  );
};

export default QuickFood;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop:10
  },
  image: {
    width: imageWidth,
    height: imageWidth,
  },
});
