import axios from "axios";

const baseUrl = "https://apma-backend.herokuapp.com/";

/**
 * Login User
 * @param {*} registerInfo first_name, last_name, email, password
 * @param {*} type Tenant or Landowner
 */

export const register = async (registerInfo, type) => {
  const url = baseUrl + type.toLowerCase();
  delete registerInfo.type;
  console.log("REGISTERINFO", registerInfo);
  const success = await axios.post(url, {
    ...registerInfo,
  });

  console.log("register success", success);
  return success.status;
};

export const login = async (loginInfo) => {
  console.log("login service", loginInfo);
  const user = await axios.post(`${baseUrl}login`, {
    ...loginInfo,
  });
  console.log("login success?", user);
  if (user.id === null) {
    console.log("Something went wrong");
    return;
  } else {
    return user;
  }
};

export const getLandowner = async (landownerId) => {
  const user = await axios.get(`${baseUrl}landowner/${landownerId}`);

  if (user.id === null) {
    console.log("Something went wrong");
    return;
  } else {
    return user;
  }
};

/* Landowner Function */
export const addProperty = async (propertyInfo) => {
  const user = await axios.get(`${baseUrl}property`);

  if (user.id === null) {
    console.log("Something went wrong");
    return;
  } else {
    return user;
  }
};
