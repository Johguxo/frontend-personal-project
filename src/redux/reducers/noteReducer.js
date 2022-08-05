import { ToastAndroid } from 'react-native';
import {
  GET_NOTE_START,
  GET_NOTE_SUCCESS,
  GET_NOTE_FAILURE,
  UPDATE_NOTE_START,
  UPDATE_NOTE_SUCCESS,
  UPDATE_NOTE_FAILURE,
  NEW_NOTE_FAILURE,
  NEW_NOTE_SUCCESS,
  GET_LIST_NOTE_START,
  GET_LIST_NOTE_SUCCESS,
  GET_LIST_NOTE_FAILURE
} from '../constants/noteConstants'

const INITIAL_DATA = {
  lastNote: null,
  notes: [],
  isFetching: false,
  error: false,
  errorResponse: null
}

const noteReducer = (state = INITIAL_DATA, action) => {
  switch (action.type) {
    case GET_NOTE_START:
      return {
        ...state,
        lastNote: null,
        isFetching: true,
        error: false,
        errorResponse: null,
      }
    case GET_NOTE_SUCCESS:
      return {
        ...state,
        lastNote: action.payload,
        isFetching: false,
        error: false,
        errorResponse: null,
      };
    case GET_NOTE_FAILURE:
      return {
        ...state,
        lastNote: null,
        isFetching: false,
        error: true,
        errorResponse: action.payload,
      };
    case GET_LIST_NOTE_START:
      return {
        ...state,
        notes: [],
        isFetching: true,
        error: false,
        errorResponse: null,
      }
    case GET_LIST_NOTE_SUCCESS:
      return {
        ...state,
        notes: action.payload,
        isFetching: false,
        error: false,
        errorResponse: null,
      };
    case GET_LIST_NOTE_FAILURE:
      return {
        ...state,
        notse: [],
        isFetching: false,
        error: true,
        errorResponse: action.payload,
      };
    case NEW_NOTE_SUCCESS:
      return {
          ...state,
          lastNote: action.payload,
          isFetching: false,
          error: false,
          errorResponse: null,
        }
    case NEW_NOTE_FAILURE:
        return {
          ...state,
          lastNote: null,
          isFetching: false,
          error: true,
          errorResponse: action.payload,
        }
    case UPDATE_NOTE_START:
      return {
        ...state,
        isFetching: true,
        error: false,
        errorResponse: null,
      }
    case UPDATE_NOTE_SUCCESS:
      return {
        ...state,
        lastNote: action.payload,
        isFetching: false,
        error: false,
        errorResponse: null,
      }
    case UPDATE_NOTE_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: true,
        errorResponse: action.payload,
      }
    default:
      return { ...state };
  }
};

export default noteReducer;