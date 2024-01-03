// All leader board API's will be here

import axios from "axios";

const leaderBoard = async (token) => {
  const response = await axios.get(
    "https://dictionarybackendapp-production.up.railway.app/v1/wordifyme/leader-board",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response;
};


export {leaderBoard}
