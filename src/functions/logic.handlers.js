// NOTE: The main use of these handlers is to parse the error message in correct format
export default class LogicHandler {
  // Pass all the client side code as a function
  static clientSide = async (func) => {
    try {
      await func();
    } catch (error) {
      console.log("ClientError: " + error);
      throw new Error("ClientError: " + error.message);
    }
  };
  // Pass all the requests code as a function
  static serverSide = async (func) => {
    try {
      const response = await func();
    } catch (error) {
      console.log("ServerError: " + JSON.stringify(error.response.data));
      throw new Error("ServerError: " + error.response.data.message);
    }
  };
}
