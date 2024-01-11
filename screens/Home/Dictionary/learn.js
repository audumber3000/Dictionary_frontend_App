import { StyleSheet, Text, View,Image, FlatList } from 'react-native'
import React,{useContext,useState,useEffect,useCallback} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { AuthContext } from "../../../store/auth-context";
import axios from 'axios';
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import * as Progress from "react-native-progress";
import Loading from './Loading';
import { useFocusEffect } from '@react-navigation/native';
const Tab = createMaterialTopTabNavigator()

const Home = ({navigation}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { token } = useContext(AuthContext)
  const RenderItem = ({item}) => {
    return (
      <View style={styles.flatContainer}>
        <View style={styles.cardContainer}>
          <View style={styles.flatListImg}>
            
          </View>
          <View>
            <View style={styles.sidetopView}>
            <Text style={{fontSize:18,fontWeight:'500'}}>{item.name}</Text>
          <Text style={{top:-4, fontSize:12}}>Progress 60%</Text>
          <Progress.Bar
                    style={{top:-8}}
                    progress={item.progress}
                    color={"#A780E8"}
                    width={150}
                    borderWidth={1}
                    borderColor={"#A780E8"}
                    unfilledColor={"white"}
                    height={7}
                    animationType="timing"
            borderRadius={10}

          />
          <View style={styles.bottom}>
            <Text style={{fontSize:11}}>300 Word</Text>
            <FontAwesome5
                    onPress={() => navigation.navigate("WordList")}
                    style={{ textAlign: "right", left:80 }}
                    name="arrow-circle-right"
                    size={22}
                    color={"#8F6ACD"}
                  />
          </View>
          </View>
          
        </View>
          </View>
      </View>
    )
  }
  useFocusEffect(
    useCallback(() => {
      const fetchData = async() => {
        try {
          setLoading(true)
        if (!token) {
          console.error("Token not found in AsyncStorage");
          return;
        }
        const response = await axios.get(
          "https://dictionarybackendapp-production.up.railway.app/v1/wordifyme/user-word-category/65798b945026a7002a24e194",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        const newData = response.data.data
        setData(newData)
        } catch (error) {
          console.error("error found");
        } finally {
          setLoading(false)
        }
      }
      fetchData()
    },[token])
  )

  

  if (!loading) {
    return (
      <View style={styles.middleContainer}>
        <FlatList
        data={data}
        renderItem={RenderItem}
        
      />
      </View>
    )
  } else {
    return <Loading/>
  }
}
const Setting = () => {
  return (
    <View>
      <Text></Text>
    </View>
  )
}
const LearnScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topContainer}>
        <Text style={{ fontSize:26, fontWeight: 'bold',color:'white',left:20,top:10}}>Word Categories</Text>
        <Image style={styles.imgView} source={require('../../../assets/Group1.png')} />
      </View>
      <View style={styles.bottomContainer}>
        <Tab.Navigator>
          <Tab.Screen options={{
            
            tabBarLabelStyle: { fontSize: 22, fontWeight:'700',textTransform:'none',color:'#6829ce' },
            tabBarIndicatorStyle: {
              height: 3,
              width: 69,
              left: 19,
              bottom:6,
              backgroundColor: '#A780E8',
              
            },
            tabBarStyle:{width:240}
          }} name='General' component={Home} />
          <Tab.Screen
            options={{
              tabBarIcon: ({ color, size }) => (
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Image
          source={require('../../../assets/coin/icon.png')}
          style={{ width: 30, height: 30,left:45  }}
        />

      </View>

              ),
              tabBarLabelStyle: { fontSize: 22,textTransform:'none', color:'#6829ce',fontWeight:'700',position:'absolute',top:-34,left:-42 },
              tabBarIndicatorStyle: {
                height: 3,
                bottom:6,
                width: 66,
                left: 22,
                backgroundColor:'#A780E8'
              },
              tabBarStyle:{width:240}
            }}
            name='Exams' component={Setting} />
          </Tab.Navigator>
      </View>
    </SafeAreaView>
  )
}

export default LearnScreen

const styles = StyleSheet.create({
  topContainer: {
    flex: 1,
    backgroundColor:'#A780E8'
  },
  bottomContainer: {
    flex: 3,
    backgroundColor: 'white',
    flexDirection:'row'
  },
  imgView: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
    top: 20,
    
    
  },
  flatContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  middleContainer: {
    flex:1
  },
  container: {
    flex:1
  },
  flatListImg: {
    width: 100,
    height: 100,
    borderWidth: 1,
    borderColor: 'black',
  
  },
  sidetopView: {
    justifyContent: 'space-between',
    flex: 1,
    left:15
  },
  flatListheading: {},
  bottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'space-between'
  },
  cardContainer: {
    backgroundColor: 'white',
    width: '90%',
    margin: 10,
    padding: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    flexDirection:'row'
  }
  
})

