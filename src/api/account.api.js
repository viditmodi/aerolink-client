import request from "../config/axios.config";
import LogicHandler from "../functions/logic.handlers";
import { Validation } from "../helpers";
import storage from "../helpers/storage.helper";

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
    const numOfAccounts = storage.getAllAccounts().length;
    await LogicHandler.clientSide(() => {
      // Check: Check if already logged in
      const loginIndex = storage.getLoginIndexByEmail(query);

      if (loginIndex >= 0) {
        // alert("Already Logged In");
        returnData = {
          newLogin: false,
          index: loginIndex,
          length: numOfAccounts,
        };
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
      // console.log(data);
      response = await request.post(loginURL, data);
    });
    const resData = response.data;
    const accountIndex = storage.addNewAccount({
      account: resData.data,
      auth_token: resData.authToken,
    });
    returnData = {
      newLogin: true,
      index: accountIndex,
      length: numOfAccounts + 1,
    };
    return returnData;
  };

  static updateAccount = async (data) => {
    await LogicHandler.clientSide(() => {
      const loginIndex = storage.getAccountByEmail(data.email);
      if (loginIndex < 0) throw new Error("Login First");
    });
    let response = null;
    await LogicHandler.serverSide(async () => {
      response = await request.put(
        baseAccountURL + "?query=" + data.email,
        data
      );
    });

    const resData = response.data;
    storage.updateAccount(resData.data);
    return resData;
  };

  static changePassword = async (email, data) => {
    let response = null;
    await LogicHandler.serverSide(async () => {
      response = await request.put(passwordURL + email, data);
    });

    const resData = response.data;
    return resData;
  };

  static generateOTP = async (email) => {
    let response = null;
    await LogicHandler.serverSide(async () => {
      response = await request.get(otpURL + email);
    });

    const resData = response.data;
    return resData;
  };

  static verifyOTP = async (email, otp) => {
    let response = null;
    await LogicHandler.serverSide(async () => {
      response = await request.put(otpURL + email, { otp: otp });
    });

    const resData = response.data;
    return resData;
  };

  static resetPassword = async (data) => {
    let response = null;
    await LogicHandler.serverSide(async () => {
      response = await request.get(passwordURL + email);
    });

    const resData = response.data;
    return resData;
  };

  static logoutFromSingleAccount = async (id) => {
    let token = null;
    await LogicHandler.clientSide(() => {
      const data = storage.getAccountByIndex(id);
      token = data.auth_token;
    });
    let response = null;
    await LogicHandler.serverSide(async () => {
      response = await request.put(
        logoutURL,
        {},
        {
          headers: { authorization: token },
        }
      );
    });

    const resData = response.data;
    storage.removeAccountById(id);
    return resData;
  };

  static deleteAccount = async (id) => {
    let data = null;
    await LogicHandler.clientSide(() => {
      data = storage.getAccountByIndex(id);
    });
    console.log(data);
    let response = null;
    await LogicHandler.serverSide(async () => {
      response = await request.delete(
        baseAccountURL + "?query=" + data.account.email
      );
    });

    const resData = response.data;
    storage.removeAccountById(id);
    return resData;
  };
}

export default HttpRequest;
