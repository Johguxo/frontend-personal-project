import {
  GET_FAVS_START,
  GET_FAVS_SUCCESS,
  GET_FAVS_FAILURE,
  ADD_ITEM_FAV_SUCCESS,
  ADD_ITEM_FAV_FAILURE,
  UPDATE_ITEM_FAV_SUCCESS,
  UPDATE_ITEM_FAV_FAILURE,
  NEW_FAV_SUCCESS,
  NEW_FAV_FAILURE,
} from '../constants/favsConstants'

import { BASE_URL } from '../../config'
import customAxios from '../../axios'

export const loadFavs = (userId) => async (dispatch) => { 
  dispatch({
    type: GET_FAVS_START,
  })
  try {
    const response = await customAxios.get(`/api/favs`,
    {
      params: { userId: userId }
    });
    dispatch({
      type: GET_FAVS_SUCCESS,
      payload: response.data.data
    })
  } catch (err) {
    dispatch({
      type: GET_FAVS_FAILURE,
      payload: err.response
    })
  }
}

export const createFav = (fav) => async (dispatch) => {
  try {
    const response = await customAxios.post(`/api/favs`, fav);
    dispatch({
      type: NEW_FAV_SUCCESS,
      payload: response.data.data
    });
  } catch (err) {
    dispatch({
      type: NEW_FAV_FAILURE,
      payload: err.response
    })
  }
}


export const addItemFav = (idFav, data) => async (dispatch) => {
  try {
    const response = await customAxios.post(`/api/favs/${idFav}`, data);
    dispatch({
      type: ADD_ITEM_FAV_SUCCESS,
      payload: response.data.data
    })
  } catch (err) {
    dispatch({
      type: ADD_ITEM_FAV_FAILURE,
      payload: err.response
    })
  }
}

export const updateItemFav = (idFav, data) => async (dispatch) => {
  try {
    const response = await customAxios.patch(`/api/favs/${idFav}`, data);
    dispatch({
      type: UPDATE_ITEM_FAV_SUCCESS,
      payload: response.data.data
    })
  } catch (err) {
    dispatch({
      type: UPDATE_ITEM_FAV_FAILURE,
      payload: err.response
    })
  }
}


