import { REGEX } from "../data";

class Validation {
  static isValidEmail = (email) => {
    try {
      const trimmedEmail = email.replace(REGEX.WHITESPACE, "");
      if (!REGEX.EMAIL.test(trimmedEmail)) {
        throw new Error("Invalid Email! Please enter a valid email.");
      }
    } catch (error) {
      console.log("Error - Validation - isValidEmail");
      throw error;
    }
  };
}

export default Validation;
