import ls from 'local-storage';

export default function axiosConfig() {
  const user = ls('user');
  const config = {
    headers: { Authorization: `Bearer ${user?.token}` },
  };
  return config;
}
