import {BASE_URL} from './config'
import axios from "axios";

const customAxios = axios.create({
  baseURL: BASE_URL,
});

export default customAxios;
