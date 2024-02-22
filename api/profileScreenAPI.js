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

const updateUserAPI = async (userId, updatedData, token) => {
  try {
      const response = await axios.put(`https://dictionarybackendapp-production.up.railway.app/v1/users/edit-user/${userId}`, updatedData, {
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
                
          },
      });
      console.log(token);
      console.log(userId);
      return response;
  } catch (error) {
    console.log(token);
      console.log(userId);
      throw new Error(`Error updating user data: ${error.message}`);
      
  }
};

export { profileAPI, updateUserAPI };
