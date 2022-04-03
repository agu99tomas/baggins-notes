exports.success = (res, msg) => {
  const data = {
    status: 1,
    message: msg,
  };
  return res.status(200).json(data);
};

exports.successWithData = (res, msg, data) => {
  const resData = {
    status: 1,
    message: msg,
    data,
  };
  return res.status(200).json(resData);
};

exports.serverError = (res, msg) => {
  const data = {
    status: 0,
    message: msg,
  };
  return res.status(500).json(data);
};

exports.notFound = (res, msg) => {
  const data = {
    status: 0,
    message: msg,
  };
  return res.status(404).json(data);
};

exports.validationErrorWithData = (res, msg, data) => {
  const resData = {
    status: 0,
    message: msg,
    data,
  };
  return res.status(400).json(resData);
};

exports.unauthorized = (res, msg) => {
  const data = {
    status: 0,
    message: msg,
  };
  return res.status(401).json(data);
};