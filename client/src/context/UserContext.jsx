import { createContext } from "react";

const UserContext = createContext({
  userId: null,
  userType: null,
  userName: null,
  updateUserId: () => {},
  updateUserType: () => {},
  updateUserName: () => {},
});

export default UserContext;
