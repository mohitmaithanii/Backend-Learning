// Middleware function for handling async errors in Express.js

const asyncHandler = (requestHandler) => {
  // Return a new function that takes in req, res, and next as parameters
  return (req, res, next) => {
    // Use Promise.resolve to convert the requestHandler function into a promise
    Promise.resolve(requestHandler(req, res, next))
      // If the promise is resolved, do nothing
      .then(() => {})
      // If the promise is rejected, pass the error to the next middleware function
      .catch((error) => next(error));
  };
};

export { asyncHandler };

/* 
const asyncHandler = () => {}
const asyncHandler = (function) => {() => {}}
const asyncHandler = (function) => async () => {}

const asyncHandler = (fun) => async (req, res, next) => {
    try {
        await fun(req, res, next);
    } catch (error) {
        res.status(error.code || 500).json({
            success: false,
            message: error.message,
        });
    }
};
*/
