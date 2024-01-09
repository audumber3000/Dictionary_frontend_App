import { StyleSheet, Text, View,Image, StatusBar,TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'


const Result = () => {
  return (
    <SafeAreaView style={styles.container}>
          <Text style={{color:'black',fontSize:19,fontWeight:'500'}}>Good Job</Text>
          <Image style={styles.imgView} source={require('../../../assets/coin/tropy.png')} />
          <Image style={{width:'90%',height:60,marginTop:30}} source={require('../../../assets/coin/graph.png')} />
          <View style={styles.gridView}>
              <View style={styles.gridContainer}>
                  <Text>Correct Answer</Text>
                  <Text style={styles.textBold}>7 questions</Text>
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
                  <Text>Incorrect Answer</Text>
                  <Text style={styles.textBold}>1</Text>
              </View>

          </View>
          <View style={styles.btnView}>
              <TouchableOpacity >
                  <Image style={{width:280,height:60,borderRadius:100}} source={require('../../../assets/coin/Button.png')}/>
              </TouchableOpacity>
              
              <TouchableOpacity >
                  <Image style={{width:70,height:60}} source={require('../../../assets/coin/share.png')}/>
              </TouchableOpacity>
              
          </View>
          <StatusBar backgroundColor={'white'}/>
    </SafeAreaView>
  )
}

export default Result

const styles = StyleSheet.create({
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
        justifyContent: 'space-around',
        gap:30
    }
})