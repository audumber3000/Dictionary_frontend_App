import { StyleSheet, Text, View,Image, StatusBar,TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AntDesign } from '@expo/vector-icons'


const Result = ({ route }) => {
    const { correctAnswers, totalQuestions } = route.params;
  return (
    <SafeAreaView style={styles.container}>
          <Text style={{color:'black',fontSize:19,fontWeight:'500'}}>Good Job</Text>
          <Image style={styles.imgView} source={require('../../../assets/coin/tropy.png')} />
          <Image style={{width:'90%',height:60,marginTop:30}} source={require('../../../assets/coin/graph.png')} />
          <View style={styles.gridView}>
              <View style={styles.gridContainer}>
                  <Text>Correct Answer</Text>
                  <Text style={styles.textBold}>{correctAnswers} questions</Text>
              </View>
              <View style={styles.gridContainer}>
                  <Text>Completion</Text>
                  <Text style={styles.textBold}>80%</Text>
              </View>
              <View style={styles.gridContainer}>
                  <Text>Skipped </Text>
                  <Text style={styles.textBold}>2</Text>
              </View>
              <View style={styles.gridContainer}>
                  <Text>total question</Text>
                  <Text style={styles.textBold}>{totalQuestions}</Text>
              </View>

          </View>
          <View style={styles.btnView}>
              <TouchableOpacity style={styles.doneBtn} >
                  <Text style={styles.doneText}>Done</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.shareBtn}>
              <AntDesign name="sharealt" size={24} color="#59066c" />
              </TouchableOpacity>
              
          </View>
          <StatusBar backgroundColor={'white'}/>
    </SafeAreaView>
  )
}

export default Result

const styles = StyleSheet.create({
    doneBtn: {
        width:'65%',
        backgroundColor: '#5a04a6',
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        borderRadius: 40,
        
    },
    doneText: {
        color: 'white',
        fontSize: 22,
        fontWeight:'600'
    },
    shareBtn: {
        borderColor: 'black',
        borderWidth: 0.3,
        width: 60,
        height: 50,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent:'center'
    },
    imgView: {
        width: '90%',
        height: 300,
        borderRadius: 10,
        marginTop:30
    },
    gridView: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 20,
        marginHorizontal: 20,
        marginTop:20
    },
    gridContainer: {
        width: '45%',
        gap:20
    },
    container: {
        flex: 1,
        alignItems: 'center',
        marginTop: 20,
        backgroundColor:'white'
    },
    textBold: {
        color: 'black',
        fontWeight:'600'
    },
    btnView: {
        flexDirection: 'row',
        marginTop: 50,
        alignItems: 'center',
        justifyContent: 'center',

        gap:30
    }
})