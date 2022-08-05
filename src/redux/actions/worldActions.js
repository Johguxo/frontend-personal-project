import {
  GET_WORLD_START,
  GET_WORLD_SUCCESS,
  GET_WORLD_FAILURE,
  SAVE_WORLD_START,
  SAVE_WORLD_SUCCESS,
  SAVE_WORLD_FAILURE,
  UPDATE_WORLD_START,
  UPDATE_WORLD_SUCCESS,
  UPDATE_WORLD_FAILURE,
} from '../constants/worldConstants'
import axios from "axios";
import { useDispatch } from "react-redux";

import {BASE_URL} from '../../config';
import customAxios from '../../axios';

export const loadWorld = (userId) => async (dispatch) => {
  dispatch({
    type: GET_WORLD_START,
  })
  try {
    const response = await customAxios.get(`/api/world`,
      {
        //headers: { 'Authorization':`Bearer ${getState().auth.user.token}` },
        params: { userId: userId }
      });
    dispatch({
      type: GET_WORLD_SUCCESS,
      payload: response.data.data
    })
  } catch (err) {
    dispatch({
      type: GET_WORLD_FAILURE,
      payload: err.response
    })
  }
}

export const saveWorld = (world) => async (dispatch) => {
  const { name, description } = world
  dispatch({
    type: SAVE_WORLD_START,
  })
  try {
    const response = await customAxios.post(`/api/world`,
      { name, description }
    );
    dispatch({
      type: SAVE_WORLD_SUCCESS,
      payload: response.data.data
    })
  } catch(err) {
    dispatch({
      type: SAVE_WORLD_FAILURE,
      payload: err.response
    })
  }
}

export const updateWorld = (data) => async (dispatch) => {
  const { name, description } = data
  dispatch({
    type: UPDATE_WORLD_START,
  });
  try {
    const response = await customAxios.patch(`/api/world/${data.id}`, { name,description });
    dispatch({
        type: UPDATE_WORLD_SUCCESS,
        payload: response.data.data,
    });
  } catch (err) {
    dispatch({
      type: UPDATE_WORLD_FAILURE,
      payload: err.response
    });
  }
}