const LOCAL_STORAGE_KEYWORDS = {
  ALL_ACCOUNTS_ARRAY: "aerolink_login_data",
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
  // returns an array of all account login data
  getAllAccounts = () => {
    return JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_KEYWORDS.ALL_ACCOUNTS_ARRAY)
    );
  };

  // returns the index of the account associated with the passed email
  getLoginIndex = (email) => {
    const accounts = this.getAllAccounts();
    for (let i = 0; i < accounts.length; i++) {
      if (accounts[i].email === email) {
        return i;
      }
    }
    return -1;
  };

  addNewAccount = ({ account, auth_token }) => {
    const data = { account, auth_token };
    const accounts = this.getAllAccounts();
    const index = account.push(data);
    localStorage.setItem(
      LOCAL_STORAGE_KEYWORDS.ALL_ACCOUNTS_ARRAY,
      JSON.stringify(accounts)
    );
    return index;
  };
  getAccountByIndex = (index) => {
    const accounts = this.getAllAccounts();
    const account = accounts.filter((acc, i) => i == index);
    return account;
  };
  getAccountByEmail = (email) => {
    const accounts = this.getAllAccounts();
    const account = accounts.filter((acc, i) => acc.account.email == email);
    return account;
  };
}

const storage = new Storage();
export default storage;
