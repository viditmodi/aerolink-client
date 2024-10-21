import request from "../config/axios.config";
import localStore from "../config/localstorage.config";
import REGEX from "../data/REGEX.constant";
import LogicHandler from "../functions/logic.handlers";
import { Validation } from "../helpers";

const baseURL = import.meta.env.VITE_API_BASE_URL;
const baseAccountURL = baseURL + "/account/";
const loginURL = baseURL + "/account/login";
const logoutURL = baseURL + "/account/logout";
const otpURL = baseURL + "/account/otp?query=";
const passwordURL = baseURL + "/account/password?query=";

class HttpRequest {
  static createAccount = async ({ email }) => {
    const data = {};
    // Try - Validations
    await LogicHandler.clientSide(() => {
      Validation.isValidEmail(email);
      data.email = email;
    });
    // Try - HttpRequest
    let response = null;
    await LogicHandler.serverSide(async () => {
      response = await request.post(baseAccountURL, data);
    });
    const resData = response.data;
    console.log(resData.message);
    return resData;
  };

  static logIntoAccount = async ({ query, password }) => {
    let returnData = null;
    const data = {};
    await LogicHandler.clientSide(() => {
      // Check: Check if already logged in
      const loginIndex = localStore.isLoggedIn(query);

      if (loginIndex >= 0) {
        // alert("Already Logged In");
        returnData = { newLogin: false, index: loginIndex };
      }

      Validation.isValidEmail(query);
      data.query = query;
      data.password = password;
    });
    if (returnData) {
      return returnData;
    }
    let response = null;
    await LogicHandler.serverSide(async () => {
      console.log(data);
      response = await request.post(loginURL, data);
    });
    const resData = response.data;
    // TODO: Merge both functions
    const tokenIndex = localStore.addAuthToken(resData.authToken);
    const dataIndex = localStore.addAccountData(resData.data);

    returnData = {
      newLogin: true,
      index: dataIndex,
    };
    return returnData;
  };
}
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

export default HttpRequest;
