import axios from 'axios';

const baseURL = import.meta.env.VITE_BACKEND_URL;

const defalutImageUrl = 'https://img.freepik.com/free-photo/user-profile-icon-front-side_187299-39596.jpg?t=st=1736116794~exp=1736120394~hmac=0e289b99c1a3cf9646ccf2d8e6f69b35e6a2bf8ea2b24c0e98786a3abd646c3c&w=1380'

const getUsers = async () => {
  const response = await axios.get(`${baseURL}/users`);
  for (let user of response.data){
    if (!user.image){
      user.image = defalutImageUrl;
    }
  }
  return response.data;
}

const getUser = async (id) => {
  const response = await axios.get(`${baseURL}/users/${id}`);
  if (!response.data.image){
    response.data.image = defalutImageUrl;
  }
  return response.data;
}

const updateUser = async(id, data) => {
  const response = await axios.put(`${baseURL}/users/${id}`, data);
  return response.data;
}
const uploadProfilePicture = async (id, data, options) => {
  const response = await axios.put(`${baseURL}/users/${id}/profilePicture`, data, options);
  return response.data;
}

const deleteProfilePicture = async( id) => {
  const response = await axios.delete(`${baseURL}/users/${id}/profilePicture`);
  return response.data;
}

export { getUsers, getUser, updateUser, uploadProfilePicture, deleteProfilePicture };
