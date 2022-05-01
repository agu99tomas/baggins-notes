import { useState } from 'react';
import ls from 'local-storage';

export default function useUserData() {
  const getUserData = () => ls('user');

  const [userData, setUserData] = useState(getUserData());

  const saveUserData = (data) => {
    ls('user', data);
    setUserData(data);
  };

  return {
    setUserData: saveUserData,
    userData,
  };
}
