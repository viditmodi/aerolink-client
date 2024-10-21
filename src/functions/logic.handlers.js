export default class LogicHandler {
  static clientSide = async (func) => {
    try {
      await func();
    } catch (error) {
      console.log("ClientError: " + error);
      throw new Error("ClientError: " + error.message);
    }
  };
  static serverSide = async (func) => {
    try {
      const response = await func();
    } catch (error) {
      console.log("ServerError: " + error.response.data);
      throw new Error("ServerError: " + error.response.data.message);
    }
  };
}
