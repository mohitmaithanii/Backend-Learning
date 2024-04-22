// Custom ApiResponse class for handling API responses
class ApiResponse {
  // Constructor takes in statusCode, data, and message as parameters
  constructor(statusCode, data, message = "Success") {
    // Set the statusCode property to the all parameter
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;

    // Set the success property based on the statusCode parameter If statusCode is less than 400, success is true, otherwise false
    this.success = statusCode < 400;
  }
}

export { ApiResponse };
