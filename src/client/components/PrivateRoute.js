import React from 'react';
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import ls from 'local-storage';

export default function PrivateRoute({ component: Component }) {
  const token = ls('userData')?.token;
  const anonymous = token == null;
  return anonymous ? <Navigate to="/" /> : <Component />;
}

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
};
