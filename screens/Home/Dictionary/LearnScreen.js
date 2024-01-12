import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList } from 'react-native';
import React, { useEffect, useState,useContext } from 'react';
import axios from 'axios';
import { SafeAreaView } from 'react-native-safe-area-context';
import Loading from './Loading';
import { AuthContext } from '../../../store/auth-context';
import * as Progress from "react-native-progress";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
const LearnScreen = ({navigation}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { token } = useContext(AuthContext);
  const [selectedTab, setSelectedTab] = useState('General');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
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
        );
        const newData = response.data.data;
        setData(newData);
      } catch (error) {
        console.error("error found");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [token]);
  console.log(data)

  const RenderItem = ({ item }) => {
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
                    onPress={() => navigation.navigate("SwipeList")}
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
    );
  };

  const General = () => {

    if (!loading) {
      return (
        <View style={styles.middleContainer}>
          <FlatList
            data={data}
            renderItem={RenderItem}
          />
        </View>
      );
    } else {
      return <Loading />;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      

      <View style={styles.topView}>
        <Text style={{ fontSize: 26, fontWeight: 'bold', color: 'white', left: 20, top: 10 }}>Word Categories</Text>
        <Image style={styles.imgView} source={require('../../../assets/Group1.png')} />

      </View>
      <View style={styles.bottomView}>
        <View style={styles.buttonView}>
        <TouchableOpacity
        style={[styles.firstBtn, selectedTab === 'General' ? styles.selected : null]}
        onPress={() => setSelectedTab('General')}
      >
        <Text style={[styles.textView, selectedTab === 'General' ? styles.selectedText : null]}>General</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.secondBtn, selectedTab === 'Exams' ? styles.selected : null]}
        onPress={() => setSelectedTab('Exams')}
      >
            <View style={{flexDirection:'row'}}>
              <Text style={[styles.textView, selectedTab === 'Exams' ? styles.selectedText : null]}>Exams</Text>
              <Image style={{width:33,height:33,position:'absolute',left:80,top:1}} source={require('../../../assets/coin/icon.png')}/>
        </View>
      </TouchableOpacity>
      


      </View>
      {selectedTab === 'General' && <General />}
      </View>
    </SafeAreaView>
  );
};

// Your existing styles

export default LearnScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topView: {
    flex: 1,
    backgroundColor: '#A780E8',
  },
  bottomView: {
    flex: 3.5,
    backgroundColor: 'white',
  },
  imgView: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
    top: 20,
  },
  buttonView: {
    flexDirection: 'row',
    left: 5,
    top: 6,
  },
  textView: {
    fontSize: 25,
    fontWeight: '800',
    color: '#5620ad',
  },
  firstBtn: {
    left:20,
    paddingVertical: 14,
    borderBottomWidth: 2, // Default bottom border
    borderColor: 'transparent', // Default border color
    
  },
  secondBtn: {
   left:60,
    paddingVertical: 14,
    borderBottomWidth: 2, // Default bottom border
    borderColor: 'transparent', // Default border color
  },
  selected: {
    borderColor: '#5620ad',
    
    
  },
  selectedText: {
    color: '#5620ad', // Selected text color
  },
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
  
});
