import Axios from 'axios'
import Config from '../config'

Object.assign(Axios.defaults, Config.axios);

export default Axios;
