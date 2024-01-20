// All home API's will be here
// ApiService.js

import axios from "axios";

const fetchData = async (token) => {
  try {
    const response = await axios.get(
      "https://dictionarybackendapp-production.up.railway.app/v1/wordifyme/home/653a65f6113cf91090bf6192",
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
