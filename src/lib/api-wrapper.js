import Config from 'config';
import Axios from 'axios';

export default Axios.create({
  baseURL: Config.apiUrl,
  withCredentials: true
});
