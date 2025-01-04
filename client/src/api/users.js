import axios from 'axios';

const baseURL = import.meta.env.VITE_BACKEND_URL;

const getUsers = async () => {
  const response = await axios.get(`${baseURL}/users`);
  return response.data;
}

export { getUsers };
