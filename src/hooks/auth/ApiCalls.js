import axios from "axios";
import { loginFailure, loginStart, loginSuccess, logout } from "./AuthActions";

import {BASE_URL} from '../../config';

export const login = async (user, dispatch) => {
  dispatch(loginStart());
  try {
    const res = await axios.post(`${BASE_URL}/auth/local/login`, user);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure());
  }
};

export const logoutSuccess = (dispatch) => {
  dispatch(logout());
}

export const register = async (data, dispatch) => {
  try {
    const res = await axios.post(`${BASE_URL}/auth/local/register`, data);
    const {email, password} = data;
    login({email,password},dispatch)
  } catch (err) {
  }
};

export const verifyEmail = async (email) => {
  const data = { email };
  try {
    return await axios.post(`${BASE_URL}/api/auth/verify`, data);
  } catch (error) {
    console.log(error);
  }
};