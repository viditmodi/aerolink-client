const LOCAL_STORAGE_KEYWORDS = {
  ALL_ACCOUNTS: "aerolink_accountsdata",
  ALL_ACCOUNTS_ARRAY: "aerolink_login_data",
  ALL_AUTH_TOKENS: "aerolink_authtokens",
};
class LocalStorage {
  constructor() {
    if (!localStorage.getItem(LOCAL_STORAGE_KEYWORDS.ALL_ACCOUNTS_ARRAY)) {
      localStorage.setItem(
        LOCAL_STORAGE_KEYWORDS.ALL_ACCOUNTS_ARRAY,
        JSON.stringify([])
      );
    }
  }
  // NEW FUNCTIONS
  static getAllAccounts = () => {
    return JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_KEYWORDS.ALL_ACCOUNTS_ARRAY)
    );
  };

  static getLoginIndex = (email) => {
    const accounts = this.getAllAccounts();
    for (let i = 0; i < accounts.length; i++) {
      if (accounts[i].email === email) {
        return i;
      }
    }
    return -1;
  };

  // OLD FUNCTIONS
  saveCurrentId(id) {
    sessionStorage.setItem("aerolink__currentid", id);
  }
  removeCurrentId() {
    sessionStorage.removeItem("aerolink__currentid");
  }
  getCurrentId() {
    const id = sessionStorage.getItem("aerolink__currentid");
    return id ? id : -1;
  }
  doesAccountExist() {
    this.checkExistence();
    const accounts = JSON.parse(localStorage.getItem("aerolink_accountsdata"));
    // console.log(accounts?.length);
    return accounts?.length;
  }
  checkExistence() {
    if (!localStorage.getItem(LOCAL_STORAGE_KEYWORDS.ALL_ACCOUNTS)) {
      localStorage.setItem(
        LOCAL_STORAGE_KEYWORDS.ALL_ACCOUNTS,
        JSON.stringify([])
      );
    }
    if (!localStorage.getItem(LOCAL_STORAGE_KEYWORDS.ALL_AUTH_TOKENS)) {
      localStorage.setItem(
        LOCAL_STORAGE_KEYWORDS.ALL_AUTH_TOKENS,
        JSON.stringify([])
      );
    }
  }
  isLoggedIn(email) {
    const accounts = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_KEYWORDS.ALL_ACCOUNTS)
    );
    for (let i = 0; i < accounts.length; i++) {
      if (accounts[i].email === email) {
        return i;
      }
    }
    return -1;
  }

  //blue-f// Auth Tokens
  addAuthToken(token) {
    const tokens = this.getAllAuthTokens() || [];
    console.log(token);
    const index = tokens.push(token);
    localStorage.setItem("aerolink_authtokens", JSON.stringify(tokens));
    return index - 1;
  }
  getAuthToken(index = 0) {
    const tokens = this.getAllAuthTokens();
    if (index >= tokens.length) return undefined;
    return tokens[index];
  }
  getAllAuthTokens() {
    this.checkExistence();
    return JSON.parse(localStorage.getItem("aerolink_authtokens"));
  }
  removeAuthToken(index) {
    const oldToken = localStore.getAuthToken(index);
    const tokens = this.getAllAuthTokens();
    const tokenArray = [];
    for (let i = 0; i < tokens.length; i++) {
      if (i != index && tokens[i] != oldToken) {
        tokenArray.push(tokens[i]);
      }
    }
    console.log(tokenArray);
    localStorage.setItem("aerolink_authtokens", JSON.stringify(tokenArray));
  }
  //blue-f// Account Data
  addAccountData(data) {
    const accounts = this.getAllAccountsData() || [];
    // accounts.push(data);
    const index = accounts.push(data);
    localStorage.setItem("aerolink_accountsdata", JSON.stringify(accounts));
    return index - 1;
  }
  getAccountData(index = 0) {
    const accounts = this.getAllAccountsData();
    if (index >= accounts.length) return undefined;
    return accounts[index];
  }

  removeAccountData(index) {
    const oldAccount = localStore.getAccountData(index);
    const accounts = this.getAllAccountsData();
    const accountArray = [];
    for (let i = 0; i < accounts.length; i++) {
      if (i != index && accounts[i].email != oldAccount.email) {
        accountArray.push(accounts[i]);
      }
    }
    console.log(accountArray);
    localStorage.setItem("aerolink_accountsdata", JSON.stringify(accountArray));
  }

  updateAccountData(data) {
    let i = -1;
    let accounts = this.getAllAccountsData();
    accounts = accounts.map((account, index) => {
      if (account.email === data.email) {
        i = index;
        return data;
      } else {
        return account;
      }
    });

    localStorage.setItem("aerolink_accountsdata", JSON.stringify(accounts));
    return i;
  }
  getAllAccountsData() {
    this.checkExistence();
    // console.log(localStorage.getItem("aerolink_accountsdata"));
    return JSON.parse(localStorage.getItem("aerolink_accountsdata"));
  }
}

const localStore = new LocalStorage();
export default localStore;
