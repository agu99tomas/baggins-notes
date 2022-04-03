const apiResponse = (req, res, next) => {
  res.success = (msg) => {
    const data = {
      message: msg,
    };
    return res.status(200).json(data);
  };

  res.successWithData = (msg, data) => {
    const resData = {
      message: msg,
      data,
    };
    return res.status(200).json(resData);
  };

  res.serverError = (msg) => {
    const data = {
      message: msg,
    };
    return res.status(500).json(data);
  };

  res.notFound = (msg) => {
    const data = {
      message: msg,
    };
    return res.status(404).json(data);
  };

  res.validationErrorWithData = (msg, data) => {
    const resData = {
      message: msg,
      data,
    };
    return res.status(400).json(resData);
  };

  res.unauthorized = (msg) => {
    const data = {
      message: msg,
    };
    return res.status(401).json(data);
  };

  next();
};

module.exports = apiResponse;
