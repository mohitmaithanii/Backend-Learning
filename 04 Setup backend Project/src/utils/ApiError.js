// Custom error class for API errors
class ApiError extends Error {
  // Constructor takes in statusCode, message, stack, and errors as parameters
  constructor(
    statusCode,
    message = "Something went wrong",
    stack = "",
    errors = []
  ) {
    // Call the parent constructor with all parameter
    super(message);
    this.statusCode = statusCode;
    this.data = null;
    this.success = false;
    this.errors = errors;

    // If the stack parameter is provided, set the stack property to it Otherwise, capture the stack trace using Error.captureStackTrace
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export { ApiError };
