const errorHandler = (res, status, message, data , token ) => {
    return res.status(status).json({ message, data, token });
  };
  
  export default errorHandler;
  