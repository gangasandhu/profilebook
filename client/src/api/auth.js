import axios from "axios";

const baseURL = import.meta.env.VITE_BACKEND_URL;

const register = async (user) => {
  const response = await axios.post(`${baseURL}/auth/register`, user);
  return response.data;
}

export { register };