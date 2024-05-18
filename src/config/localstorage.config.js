class LocalStorage {
  doesAccountExist() {
    this.checkExistence();
    const accounts = JSON.parse(localStorage.getItem("aerolink_accountsdata"));
    // console.log(accounts?.length);
    return accounts?.length;
  }
  checkExistence() {
    if (!localStorage.getItem("aerolink_accountsdata")) {
      localStorage.setItem("aerolink_accountsdata", JSON.stringify([]));
    }
    if (!localStorage.getItem("aerolink_authtokens")) {
      localStorage.setItem("aerolink_authtokens", JSON.stringify([]));
    }
  }
  isLoggedIn(email) {
    const accounts = this.getAllAccountsData();
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
    const tokens = this.getAllAuthTokens();
    tokens.filter((token, i) => i !== index);
    localStorage.setItem("aerolink_authtokens", JSON.stringify(tokens));
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
    const accounts = this.getAllAccountsData();
    accounts.filter((account, i) => i !== index);
    localStorage.setItem("aerolink_accountsdata", JSON.stringify(accounts));
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
