import axios from 'axios';
const _token = localStorage.getItem('user');
const axiosinstance = axios.create({
  baseURL:"https://advertizment-back-2.onrender.com/api",
  headers: {
    authorization: _token ? _token : '',
  },
});
export default axiosinstance;

/*'https://advertizment-back-2.onrender.com/api'*/