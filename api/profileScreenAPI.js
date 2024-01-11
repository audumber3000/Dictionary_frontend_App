import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
const profileAPI = async (token) => {
  const userid = await AsyncStorage.getItem('userid')
  console.log(userid)
  const response = await axios.get(
    `https://dictionarybackendapp-production.up.railway.app/v1/users/${userid}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response;
};

export { profileAPI };
