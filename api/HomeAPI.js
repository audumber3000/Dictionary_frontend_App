// All home API's will be here
// ApiService.js

import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const fetchData = async (token) => {
  try {
    const userid = await AsyncStorage.getItem('userid')
    console.log("Homescreen",userid)
    const response = await axios.get(
      `https://dictionarybackendapp-production.up.railway.app/v1/wordifyme/home/${userid}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.data || !response.data.data) {
      throw new Error("Invalid response data");
    }

    return response.data.data;
  } catch (error) {
    throw new Error(error.message);
  }
};
export default fetchData;