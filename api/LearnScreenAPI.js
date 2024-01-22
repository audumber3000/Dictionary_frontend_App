import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const swipeListAPI = async (token) => {
  const userid = await AsyncStorage.getItem('userid')
  const response = await axios.get(
    `https://dictionarybackendapp-production.up.railway.app/v1/wordifyme/user-word-category/${userid}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response;
};



export {swipeListAPI}
