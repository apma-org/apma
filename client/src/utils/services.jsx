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

  if (user.status === 200) {
    return user;
  } else {
    console.log("Something went wrong");
    return;
  }
};

/* Landowner Function */
export const getProperty = async (propertyId) => {
  const property = await axios.get(`${baseUrl}property/${propertyId}`);

  if (!property.id) {
    console.log("Something went wrong");
    return;
  } else {
    return property;
  }
};

export const addProperty = async (propertyInfo) => {
  const property = await axios.post(`${baseUrl}property`, { ...propertyInfo });

  if (property.status === 200) {
    return property;
  } else {
    console.log(property.message);
    return;
  }
};

export const editProperty = async (propertyInfo, propertyId) => {
  const property = await axios.put(`${baseUrl}property/${propertyId}`, {
    ...propertyInfo,
  });

  if (!property.id) {
    console.log("Something went wrong");
    return;
  } else {
    return property;
  }
};

export const getUnit = async (unitId) => {
  const unit = await axios.get(`${baseUrl}unit/${unitId}`);

  if (!unit.id) {
    console.log("Something went wrong");
    return;
  } else {
    return unit;
  }
};

export const addUnit = async (unitInfo) => {
  const unit = await axios.post(`${baseUrl}unit`, { ...unitInfo });

  if (!unit.property_id) {
    console.log("Something went wrong");
    return;
  } else {
    return unit;
  }
};

export const editUnit = async (unitInfo, unitId, propertyId) => {
  const property = await axios.put(`${baseUrl}unit/${unitId}`, {
    ...unitInfo,
    property_id: propertyId,
  });

  if (!property.id) {
    console.log("Something went wrong");
    return;
  } else {
    return property;
  }
};
