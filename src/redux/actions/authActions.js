import { 
  USER_LOADED,
  USER_LOADING,
  USER_FAILURE,
  LOGIN_FAILURE, 
  LOGIN_START, 
  LOGIN_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAILURE, 
  UPDATE_PROFILE_START,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAILURE,
  LOGOUT 
} from "../constants/authConstants";

import {BASE_URL} from '../../config';
import customAxios from '../../axios';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ToastAndroid } from "react-native";

import deviceStorage from '../../services/deviceStorage';



export const loadUser = () => async (dispatch, getState) => {
  dispatch({
    type: USER_LOADING,
  })
  try {
    const { idUser, token } = await deviceStorage.loadData();
    if (token !== null) {
      const response = await customAxios.get(`/auth/local/info/${idUser}`)
      dispatch({
        type: USER_LOADED,
        payload: response.data.data,
        meta: token,
      })
    }
  } catch (err) {
    dispatch({
      type: USER_FAILURE,
      payload: err.response,
    })
  }
}


export const login = (dataUser) => async (dispatch) => {
  dispatch({
    type: LOGIN_START,
  });
  try {
    const response = await customAxios.post(`/auth/local/login`, dataUser);
    if (response.status === 200) {
      const saveData = {
        token: response.data.meta.token, 
        idUser: response.data.data._id 
      }
      customAxios.defaults.headers.common.Authorization = `Bearer ${saveData.token}`;
      await deviceStorage.saveItem('auth',JSON.stringify(saveData))
      dispatch({
          type: LOGIN_SUCCESS,
          payload: response.data.data,
          meta: response.data.meta.token
      });
    }
    
  } catch (err) {
    dispatch({
      type: LOGIN_FAILURE,
      payload: err.response,
    });
  }
}

export const logout = () => async (dispatch) => {
  const response = await deviceStorage.removeItem('auth');
  dispatch({
    type: LOGOUT,
  });
}

export const register = (data) => async (dispatch) => {
  dispatch({
    type: LOGIN_START,
  });
  try {
    const response = await customAxios.post(`/auth/local/register`, data);
    if (response.status === 201) {
      const saveData = {
        token: response.data.meta.token, 
        idUser: response.data.data._id 
      }
      customAxios.defaults.headers.common.Authorization = `Bearer ${saveData.token}`;
      await deviceStorage.saveItem('auth',JSON.stringify(saveData));
      
      dispatch({
        type: REGISTER_SUCCESS,
        payload: response.data.data,
        meta: response.data.meta.token
      })
    }
  } catch (err) {
    dispatch({
      type: REGISTER_FAILURE,
      payload: err.response,
    })
  }
};

export const updateProfile = (data) => async (dispatch) => {
  dispatch({
    type: UPDATE_PROFILE_START,
  });
  try {
    const formData = new FormData();
    if (data.firstName) { formData.append('firstName', data.firstName); }
    if (data.lastName) { formData.append('lastName', data.lastName); }
    if (data.uri) {
      formData.append('fileData',{
        uri: data.uri,
        name: data.uri.split('/').pop(),
        type: `image/${data.uri.split('.').pop()}`,
      })
    }
    const response = await customAxios.put(`/auth/local/${data.id}`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data; boundary=some string',
      }
    });
    dispatch({
        type: UPDATE_PROFILE_SUCCESS,
        payload: response.data.data,
    });
  } catch (err) {
    dispatch({
      type: UPDATE_PROFILE_FAILURE,
      payload: err.response,
    });
  }
}