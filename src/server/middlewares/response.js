const response = (_req, res, next) => {
  res.success = (message, data = undefined) => {
    const resData = {
      message,
    };
    if (data) resData.data = data;
    return res.status(200).json(resData);
  };

  res.serverError = (message) => {
    const data = {
      message,
    };
    return res.status(500).json(data);
  };

  res.notFound = (message) => {
    const data = {
      message,
    };
    return res.status(404).json(data);
  };

  res.validationError = (message, data) => {
    const resData = {
      message,
      data,
    };
    return res.status(400).json(resData);
  };

  res.unauthorized = (message) => {
    const data = {
      message,
    };
    return res.status(401).json(data);
  };

  next();
};

module.exports = response;
