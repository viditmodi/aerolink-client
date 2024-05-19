import request from "../config/axios.config";
import localStore from "../config/localstorage.config";

const baseURL = import.meta.env.VITE_API_BASE_URL;
const baseAccountURL = baseURL + "/account/";
const loginURL = baseURL + "/account/login";
const logoutURL = baseURL + "/account/logout";

export const createNewAccount = async (data) => {
  try {
    const response = await request.post(baseAccountURL, data);
    const resData = response.data;
    return resData;
  } catch (error) {
    console.log("Error: " + error.response.data.message);
    return error.response.data;
  }
};
export const logInToAccount = async (data) => {
  try {
    const loginStatus = localStore.isLoggedIn(data.email);
    // console.log(loginStatus);
    if (loginStatus >= 0) {
      alert("Already Logged In");
      return loginStatus;
    }
    const response = await request.post(loginURL, data);
    const resData = response.data;
    // console.log(resData);
    if (resData.status) {
      const tokenIndex = localStore.addAuthToken(resData.authToken);
      const dataIndex = localStore.addAccountData(resData.data);

      // console.log(localStore.getAllAuthTokens());

      return dataIndex;
    }
    return -1;
  } catch (error) {
    console.log("Error: " + error.response.data.message);
    return error.response.data;
  }
};
export const updateExistingAccount = async (data) => {
  try {
    // console.log(data);
    const loginStatus = localStore.isLoggedIn(data.email);
    // console.log(loginStatus);
    if (loginStatus < 0) {
      alert("Log In First");
      return loginStatus;
    }
    const response = await request.put(
      baseAccountURL + "?query=" + data.email,
      data
    );
    const resData = response.data;

    localStore.updateAccountData(resData.data);
    return resData;
  } catch (error) {
    console.log("Error: " + error.response.data.message);
    return error.response.data;
  }
};
export const logoutFromSingleAccount = async (id) => {
  try {
    const data = localStore.getAccountData(id);
    // console.log(data);
    // const loginStatus = localStore.isLoggedIn(data.email);
    // console.log(loginStatus);
    // if (loginStatus < 0) {
    //   alert("Log In First");
    //   return loginStatus;
    // }

    const token = localStore.getAuthToken(id);
    // console.log(token);
    const response = await request.put(
      logoutURL,
      {},
      {
        headers: { authorization: token },
      }
    );
    const resData = response.data;

    localStore.removeAuthToken(id);
    localStore.removeAccountData(id);

    return resData;
  } catch (error) {
    console.log("Error: " + error.response.data.message);
    return error.response.data;
  }
};
