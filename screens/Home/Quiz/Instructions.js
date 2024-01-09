import { View, Text, StyleSheet, StatusBar,TouchableOpacity,Image } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";


const Instructions = ({navigation}) => {
 
  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={["#7d3fdf","white"]}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 3, y: 0.1 }}
        style={styles.gradient}
 // Set gradient colors

      >
        <View style={styles.box1}>
          <View style={styles.leftView}>
            <Image source={require('../../../assets/coin/logo.png')} style={{ width: 100, height: 100, }} />
            <Text style={styles.sunday}>Sunday's</Text>
            <Text style={styles.quiz}>Super Quiz</Text>
            <Text style={styles.playQuiz}>Play Super Quiz & earn 200 coins</Text>
          </View>
          <View style={styles.rightView}>
            <Image source={require('.../../../assets/coin/Group.png')} style={{width: 90, height: 90,position:'absolute',top:100}}/>
            <Image source={require('.../../../assets/coin/Group.png')} style={{width: 70, height: 70,position:'absolute',top:200,left:40}}/>
            <Image source={require('.../../../assets/coin/Group.png')} style={{width: 50, height: 50,position:'absolute',top:40,left:70}}/>
            <Image source={require('.../../../assets/coin/Group.png')} style={{width: 40, height: 40,position:'absolute',top:110,left:130}}/>
            <Image source={require('.../../../assets/coin/Group.png')} style={{width: 30, height: 30,position:'absolute',top:170,left:120}}/>
            <Image source={require('.../../../assets/coin/Group.png')} style={{width: 45, height: 45,position:'absolute',top:250,left:130}}/>

          </View>
        </View>
        <View style={styles.box2}>
          <Text style={styles.todayText}>Today's Quiz on</Text>
          <Text style={styles.generalText}>General Knowledge</Text>
          <Text style={styles.endText}>The Quiz end in </Text>
          <View style={styles.dateView}>
            <View style={styles.dateInnerView}>
              <Text style={styles.borderText}>7</Text>
              <Text style={styles.borderText}>Days</Text>
            </View>
            <View style={styles.dateInnerView}>
              <Text style={styles.borderText}>23</Text>
              <Text style={styles.borderText}>Hours</Text>
            </View>
            <View style={styles.dateInnerView}>
              <Text style={styles.borderText}>55</Text>
              <Text style={styles.borderText}>Min</Text>
            </View>

          </View>
          <View style={styles.coinsView}>
            <Image source={require('../../../assets/coin/Frame.png')} style={{width:20,height:20}}/>
            <Text >70K coins distributed till now</Text>
          </View>
          <TouchableOpacity onPress={()=>navigation.navigate('Result')} style={styles.btnContainer}>
            <Text style={styles.btnText}>Play Quiz Now</Text>
          </TouchableOpacity>
        </View>

      </LinearGradient>
      <StatusBar backgroundColor={"rgba(102,0, 255, 0.5)"}  translucent={true} barStyle={"light-content"}/>
    </SafeAreaView>
  );
};

export default Instructions;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sunday: {
    marginBottom: 1,
    marginTop: 5,
    color: 'white',
    fontSize: 30,
    fontWeight:'600',
  },
  quiz: {
    fontSize: 35,
    fontWeight: '800',
    color: 'white',
    marginBottom:7
  },
  playQuiz: {
    color: 'white',
    fontWeight:'400'
  },
  gradient: {
    flex: 1,
  },
  leftView: {
    justifyContent: 'flex-end',
    marginBottom:20
  },
  box1: {
    height: '50%',
    flexDirection: 'row',
    paddingHorizontal:15
    
  },
  box2: {
    height: '50%',
    backgroundColor: 'white',
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    flex: 1,
    paddingHorizontal:15
    
  },
  todayText: {
    fontSize: 22,
    marginTop: 30,
    
    
  },
  generalText: {
    marginTop: 12,
    fontSize: 37,
    color: '#7d3fdf',
    fontWeight:'500'
  },
  endText: {
    marginTop: 12,
    fontSize: 22,
  },
  dateView: {
    flexDirection: 'row',
    gap: 20,
    marginTop: 20,
    marginBottom:30
  },
  dateInnerView: {
    borderWidth: 0.2,
    borderColor: 'black',
    alignItems: 'center',
    padding: 10,
    borderRadius: 3,
    
  },
  borderText: {
    color: 'black',
    fontWeight:'500'
  },
  coinsView: {
    flexDirection: 'row',
    marginBottom: 30,
    gap:5
  },

  btnContainer: {
    backgroundColor: '#6c38bf',

    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius:25
  },
  btnText: {
    color: 'white',
    fontSize: 20,
    fontWeight:'500'
  }
});
