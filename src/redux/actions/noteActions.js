import {
  GET_NOTE_START,
  GET_NOTE_SUCCESS,
  GET_NOTE_FAILURE,
  UPDATE_NOTE_START,
  UPDATE_NOTE_SUCCESS,
  UPDATE_NOTE_FAILURE,
  NEW_NOTE_SUCCESS,
  NEW_NOTE_FAILURE,
  GET_LIST_NOTE_START,
  GET_LIST_NOTE_SUCCESS,
  GET_LIST_NOTE_FAILURE
} from '../constants/noteConstants'

import axios from "axios";
import { useDispatch } from "react-redux";

import {BASE_URL} from '../../config';
import customAxios from '../../axios';

export const loadLastNote = (userId) => async (dispatch) => {
  dispatch({
    type: GET_NOTE_START,
  })
  try {
    const response = await customAxios.get(`/api/note/last_note`,
      { 
        params: { userId: userId }
      });
    dispatch({
      type: GET_NOTE_SUCCESS,
      payload: response.data.data
    })
  } catch (err) {
    dispatch({
      type: GET_NOTE_FAILURE,
      payload: err.response
    })
  }
}

export const loadNotes = (userId) => async (dispatch) => {
  dispatch({
    type: GET_LIST_NOTE_START,
  })
  try {
    const response = await customAxios.get(`/api/note/all_notes`,
      { 
        params: { userId: userId }
      });
    dispatch({
      type: GET_LIST_NOTE_SUCCESS,
      payload: response.data.data
    })
  } catch (err) {
    dispatch({
      type: GET_LIST_NOTE_FAILURE,
      payload: err.response
    })
  }
}

export const newNote = (note) => async (dispatch) => {
  const {title, description} = note
  dispatch({
    type: GET_NOTE_START,
  })
  try {
    const response = await customAxios.post(`${BASE_URL}/api/note`,
      { title,description }
    );
    dispatch({
      type: NEW_NOTE_SUCCESS,
      payload: response.data.data
    })
  } catch(err) {
    dispatch({
      type: NEW_NOTE_FAILURE,
      payload: err.response
    })
  }
}

export const updateNote = (note, newBody) => async (dispatch) => {
  const {_id} = note;
  const {title, description} = newBody;
  dispatch({
    type: UPDATE_NOTE_START,
  })
  try {
    const response = await customAxios.patch(`/api/note/${_id}`,
      { title, description },
    );
    dispatch({
      type: UPDATE_NOTE_SUCCESS,
      payload: response.data.data
    })
  } catch(err) {
    dispatch({
      type: UPDATE_NOTE_FAILURE,
      payload: err.response
    })
  }
}