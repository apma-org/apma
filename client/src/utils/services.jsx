import axios from "axios";
const baseUrl = "https://apma-backend.herokuapp.com/";

/**
 * Register User [Tenant or Landowner]
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
    console.log("Something went wrong getting this landowner");
    return;
  }
};

/**
 * Update Landowner Info
 * @param {*} landownerId Landowner Id number
 * @param {*} landownerInfo first_name, last_name, email, password
 * @returns Modified Landowner Object
 */
export const editLandowner = async (landownerId, landownerInfo) => {
  const user = await axios.put(`${baseUrl}landowner/${landownerId}`, {
    ...landownerInfo,
  });

  if (user.status === 400) {
    console.log("Something went wrong updating this landowner");
    return;
  } else {
    return user;
  }
};

/**
 * Get Tenant Info
 * @param {*} tenantId Landowner Id number
 * @returns Landowner Object
 */
export const getTenant = async (tenantId) => {
  const user = await axios.get(`${baseUrl}tenant/${tenantId}`);

  if (user.status === 400) {
    console.log("Something went wrong getting this landowner");
    return;
  } else {
    return user;
  }
};

/**
 * Update Tenant Info
 * @param {*} tenantId Tenant Id number
 * @param {*} tenantInfo first_name, last_name, email, password, (optional) unit_ids
 * @returns Modified Tenant Object
 */
export const editTenant = async (tenantId, tenantInfo) => {
  const user = await axios.put(`${baseUrl}tenant/${tenantId}`, {
    ...tenantInfo,
  });

  return user.status === 200;
};

export const assignTenant = async (tenant_id, unit_id) => {
  return await editTenant(tenant_id, { unit_id: unit_id });
};

/* Landowner Function */
/**
 * Get Landowner's Property Info
 * @param {*} propertyId Property Id number
 * @returns Property Object
 */
export const getProperty = async (propertyId) => {
  const property = await axios.get(`${baseUrl}property/${propertyId}`);
  console.log("get property", property);
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
 * @returns Property Object
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
 * @returns Modified Property Object
 */
export const editProperty = async (propertyInfo, propertyId) => {
  delete propertyInfo.units;
  delete propertyInfo.id;
  delete propertyInfo.landowner_id;

  const property = await axios.put(`${baseUrl}property/${propertyId}`, {
    ...propertyInfo,
  });

  if (property.status !== 200) {
    console.log("Something went wrong upating this property");
    return;
  } else {
    return property.data[0];
  }
};

/**
 * Delete Property
 * @param {*} propertyId Property Id number
 */
export const deleteProperty = async (propertyId) => {
  const data = await axios.delete(`${baseUrl}property/${propertyId}`);
  return data.status === 200;
};

/**
 * Get Unit Info
 * @param {*} unitId Unit Id number
 * @returns Unit Object
 */
export const getUnit = async (unitId) => {
  const unit = await axios.get(`${baseUrl}unit/${unitId}`);

  if (unit.status === 400) {
    console.log("Something went wrong getting this unit");
    return;
  } else {
    return unit;
  }
};

/**
 * Add Unit to Property
 * @param {*} unitInfo lease, rent_amount, rent_deposit, property_id
 * @returns Success Message
 */
export const addUnit = async (unitInfo) => {
  const unit = await axios.post(`${baseUrl}unit`, { ...unitInfo });

  if (unit.status === 200) {
    return unit;
  } else {
    console.log("Something went wrong with adding this unit");
    return;
  }
};

/**
 * Update Unit
 * @param {*} unitInfo (all fields optional) lease, rent_amount, rent_deposit, property_id (optional)
 * @param {*} unitId Unit Id number
 * @param {*} propertyId Property Id number in which the unit belongs to
 * @returns Modified Unit Object
 */
export const editUnit = async (unitInfo, unitId, propertyId) => {
  const unit = await axios.put(`${baseUrl}unit/${unitId}`, {
    ...unitInfo,
    property_id: propertyId,
  });

  if (unit.status === 400) {
    console.log("Something went wrong with updating this unit");
    return;
  } else {
    return unit.data[0];
  }
};

/**
 * Delete Unit
 * @param {*} unitId Unit Id number
 * @returns Success Status
 */
export const deleteUnit = async (unitId) => {
  const data = await axios.delete(`${baseUrl}unit/${unitId}`);
  return data.status === 200;
};

// TODO: Is Maintenance request field a decimal?
/**
 * Add Maintenance Request to Unit
 * @param {*} maintenanceInfo unit_id, request
 * @returns Success Message
 */
export const addMaintenance = async (maintenanceInfo) => {
  const maintenance = await axios.post(`${baseUrl}maintenance`, {
    ...maintenanceInfo,
  });

  return maintenance.status === 200;
};

/**
 * Get Maintenance Request
 * @param {*} maintenanceId Maintenance Id number
 * @returns Maintenance Object
 */
export const getMaintenance = async (maintenanceId) => {
  const maintenance = await axios.get(`${baseUrl}maintenance/${maintenanceId}`);

  if (maintenance.status === 400) {
    console.log("Something went wrong with getting this request");
    return;
  } else {
    return maintenance;
  }
};

/**
 * Update Maintenance
 * @param {*} maintenanceInfo unit_id, request, date_fixed
 * @param {*} maintenanceId Maintenance Id number
 * @param {*} unitId Unit Id number that maintenance request belongs to
 * @returns Modified Maintenance Object
 */
export const editMaintenance = async (maintenanceInfo, maintenanceId) => {
  const maintenance = await axios.put(
    `${baseUrl}maintenance/${maintenanceId}`,
    maintenanceInfo
  );

  if (maintenance.status === 400) {
    console.log("Something went wrong with updating this request");
    return;
  } else {
    return maintenance;
  }
};

/**
 * Delete Maintenance
 * @param {*} maintenanceId Maintenance Id number
 * @returns Success Status
 */
export const deleteMaintenance = async (maintenanceId) => {
  await axios.delete(`${baseUrl}maintenance/${maintenanceId}`);
};
