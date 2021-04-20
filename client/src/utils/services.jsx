import axios from "axios";

/**
 * Login User
 * @param {*} registerInfo first_name, last_name, email, password
 * @param {*} type Tenant or Landowner
 */
export const register = async (registerInfo, type) => {
  const success = await axios.post(
    `https://apma-backend.herokuapp.com/${type}`,
    {
      registerInfo,
    }
  );
  console.log("register success?", success);
  return success.status;
};
