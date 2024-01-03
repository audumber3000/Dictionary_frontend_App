import axios from "axios";

const profileAPI = async (token) => {
  const response = await axios.get(
    "https://dictionarybackendapp-production.up.railway.app/v1/users/65798b945026a7002a24e194",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response;
};

export { profileAPI };
