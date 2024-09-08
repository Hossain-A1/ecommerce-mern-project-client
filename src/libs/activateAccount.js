import axios from "axios";

const serverURL = "http://localhost:4000";

export const activateAccount = async (token) => {
  try {
    const response = await axios.post(`${serverURL}/api/users/activate`, {
      token,
    });
    console.log(response.data.message);
  } catch (error) {
    console.log("Failed to activate account.");
    console.error(error);
  }
};
