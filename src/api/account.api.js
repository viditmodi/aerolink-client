import request from "../config/axios.config";
import localStore from "../config/localstorage.config";

const baseURL = import.meta.env.VITE_API_BASE_URL;
const baseAccountURL = baseURL + "/account/";
const loginURL = baseURL + "/account/login";
const logoutURL = baseURL + "/account/logout";
const otpURL = baseURL + "/account/otp?query=";
const passwordURL = baseURL + "/account/password?query=";

export const createNewAccount = async (data) => {
  try {
    const response = await request.post(baseAccountURL, data);
    const resData = response.data;
    // console.log(resData)
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
export const deleteAccountRequest = async (id) => {
  try {
    // console.log(data);
    const data = localStore.getAccountData(id);
    const response = await request.delete(
      baseAccountURL + "?query=" + data.email
    );
    const resData = response.data;

    localStore.removeAccountData(id);
    localStore.removeAuthToken(id);
    return resData;
  } catch (error) {
    console.log("Error: " + error.response.data.message);
    return error.response.data;
  }
};
export const logoutFromSingleAccount = async (id) => {
  try {
    const data = localStore.getAccountData(id);

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
export const generateNewOTP = async (email) => {
  try {
    const response = await request.get(otpURL + email);
    const resData = response.data;

    // localStore.removeAuthToken(id);
    // localStore.removeAccountData(id);

    return resData;
  } catch (error) {
    console.log("Error: " + error.response.data.message);
    return error.response.data;
  }
};
export const verifyOTPRequest = async (email, otp) => {
  try {
    alert(otp);
    const response = await request.put(otpURL + email, { otp: otp });
    const resData = response.data;

    // localStore.removeAuthToken(id);
    // localStore.removeAccountData(id);

    return resData;
  } catch (error) {
    console.log("Error: " + error.response.data.message);
    return error.response.data;
  }
};
export const changePasswordRequest = async (email, data) => {
  try {
    // alert(otp);
    const response = await request.put(passwordURL + email, data);
    const resData = response.data;

    // localStore.removeAuthToken(id);
    // localStore.removeAccountData(id);

    return resData;
  } catch (error) {
    console.log("Error: " + error.response.data.message);
    return error.response.data;
  }
};
export const resetPasswordRequest = async (email) => {
  try {
    // alert(otp);
    const response = await request.get(passwordURL + email);
    const resData = response.data;

    // localStore.removeAuthToken(id);
    // localStore.removeAccountData(id);

    return resData;
  } catch (error) {
    console.log("Error: " + error.response.data.message);
    return error.response.data;
  }
};
