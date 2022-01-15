import axios from 'axios';

export const saveUser = async (username, password, visitorId) => {
  const response = await axios.post('http://localhost:3001/user', {
    username,
    password,
    visitorId,
  });
  return response.data;
};
