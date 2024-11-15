const LOCAL_STORAGE_KEYWORDS = {
  ALL_ACCOUNTS_ARRAY: "aerolink_login_data",
  SESSION_ID: "aerolink_session_id",
};
class Storage {
  constructor() {
    if (!this.getAllAccounts()) {
      localStorage.setItem(
        LOCAL_STORAGE_KEYWORDS.ALL_ACCOUNTS_ARRAY,
        JSON.stringify([])
      );
    }
  }
  // SESSION STORAGE
  saveSessionIndex(id) {
    sessionStorage.setItem(LOCAL_STORAGE_KEYWORDS.SESSION_ID, id);
  }
  removeSessionIndex() {
    sessionStorage.removeItem(LOCAL_STORAGE_KEYWORDS.SESSION_ID);
  }
  getSessionIndex() {
    const index = sessionStorage.getItem(LOCAL_STORAGE_KEYWORDS.SESSION_ID);
    return index ? index : -1;
  }

  // LOCAL STORAGE
  // returns an array of all account login data
  getAllAccounts = () => {
    return JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_KEYWORDS.ALL_ACCOUNTS_ARRAY)
    );
  };
  getNumberOfAccounts = () => {
    return JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_KEYWORDS.ALL_ACCOUNTS_ARRAY)
    ).length;
  };

  // returns the index of the account associated with the passed email
  getLoginIndexByEmail = (email) => {
    const accounts = this.getAllAccounts();
    for (let i = 0; i < accounts.length; i++) {
      if (accounts[i].account.email === email) {
        return i;
      }
    }
    return -1;
  };

  addNewAccount = ({ account, auth_token }) => {
    const data = { account, auth_token };
    const accounts = this.getAllAccounts();
    const index = accounts.push(data);
    localStorage.setItem(
      LOCAL_STORAGE_KEYWORDS.ALL_ACCOUNTS_ARRAY,
      JSON.stringify(accounts)
    );
    return index - 1;
  };

  getAccountByIndex = (index) => {
    const accounts = this.getAllAccounts();
    return accounts[index];
  };

  getAccountByEmail = (email) => {
    const accounts = this.getAllAccounts();
    const account = accounts.filter((acc, i) => acc.account.email == email);
    return account;
  };
  updateAccount = (data) => {
    const accounts = this.getAllAccounts();
    for (let i = 0; i < accounts.length; i++) {
      console.log(accounts[i].account.email === data.email);
      console.log(accounts[i].account.email, data.email);
      if (accounts[i].account.email === data.email) {
        accounts[i].account = data;
        break;
      }
    }

    console.log(accounts);
    localStorage.setItem(
      LOCAL_STORAGE_KEYWORDS.ALL_ACCOUNTS_ARRAY,
      JSON.stringify(accounts)
    );
    // return i;
  };
  removeAccountByEmail = (email) => {
    let accounts = this.getAllAccounts();
    accounts = accounts.filter((acc, i) => acc.account.email != email);
    localStorage.setItem(
      LOCAL_STORAGE_KEYWORDS.ALL_ACCOUNTS_ARRAY,
      JSON.stringify(accounts)
    );
  };
  removeAccountById = (id) => {
    let accounts = this.getAllAccounts();
    accounts = accounts.filter((acc, i) => i != id);
    console.log(accounts);
    localStorage.setItem(
      LOCAL_STORAGE_KEYWORDS.ALL_ACCOUNTS_ARRAY,
      JSON.stringify(accounts)
    );
  };
}

const storage = new Storage();
export default storage;
