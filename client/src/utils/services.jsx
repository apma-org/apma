import axios from "axios";

const baseUrl = "https://apma-backend.herokuapp.com/";

/**
 * Register User
 * @param {*} registerInfo first_name, last_name, email, password
 * @param {*} userType Tenant or Landowner
 */
export const register = async (registerInfo, userType) => {
  const url = baseUrl + userType.toLowerCase();
  delete registerInfo.type;

  const success = await axios.post(url, {
    ...registerInfo,
  });
  return success.status;
};

/**
 * Login User
 * @param {*} loginInfo email, password, type
 * @returns User Object
 */
export const login = async (loginInfo) => {
  console.log("login service", loginInfo);
  const user = await axios.post(`${baseUrl}login`, {
    ...loginInfo,
  });
  if (user.id === null) {
    console.log("Something went wrong with loggin in this user");
    return;
  } else {
    return user;
  }
};

/**
 * Get Landowner Info
 * @param {*} landownerId Landowner Id number
 * @returns Landowner Object
 */
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
/**
 * Get Landowner's Property Info
 * @param {*} propertyId Property Id number
 * @returns Property Object
 */
export const getProperty = async (propertyId) => {
  const property = await axios.get(`${baseUrl}property/${propertyId}`);

  if (property.status === 400) {
    console.log("Something went wrong with getting this property");
    return;
  } else {
    return property;
  }
};

/**
 * Add Property
 * @param {*} propertyInfo 	landowner_id, zipcode, city, state, address, mortgage, tax, insurance, appreciation
 * @returns Proper
 */
export const addProperty = async (propertyInfo) => {
  const property = await axios.post(`${baseUrl}property`, { ...propertyInfo });

  // TODO: return message or boolean or nothing
  if (property.status === 200) {
    return property;
  } else {
    console.log(property.message);
    return;
  }
};

/**
 * Update Property Info
 * @param {*} propertyInfo landowner_id, zipcode, city, state, address, mortgage, tax, insurance, appreciation
 * @param {*} propertyId Property Id number
 * @returns Updated Property Object
 */
export const editProperty = async (propertyInfo, propertyId) => {
  const property = await axios.put(`${baseUrl}property/${propertyId}`, {
    ...propertyInfo,
  });

  if (property.status === 400) {
    console.log("Something went wrong upating this property");
    return;
  } else {
    return property;
  }
};

/**
 * Get Unit Info
 * @param {*} unitId Unit Id number
 * @returns Unit Object
 */
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
