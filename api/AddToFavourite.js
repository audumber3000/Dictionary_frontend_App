import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";


const AddToFavorites = async (userId, updatedData, token) => {
    console.log("reached");
    try {
      const response = await axios.post(`https://dictionarybackendapp-production.up.railway.app/v1/users/add-to-fav/${userId}`, updatedData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
  
      console.log("Server Response:", response); // Log the entire response
      console.log(token);
      console.log(userId);
      return response;
    } catch (error) {
      console.error("Error updating favorite:", error);
      throw new Error(`Error updating favorite: ${error.message}`);
    }
  };
  

export { AddToFavorites };
