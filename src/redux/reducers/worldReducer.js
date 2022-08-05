import { ToastAndroid } from 'react-native';
import {
  GET_WORLD_START,
  GET_WORLD_SUCCESS,
  GET_WORLD_FAILURE,
  SAVE_WORLD_START,
  SAVE_WORLD_SUCCESS,
  SAVE_WORLD_FAILURE,
  UPDATE_WORLD_FAILURE,
  UPDATE_WORLD_START,
  UPDATE_WORLD_SUCCESS
} from '../constants/worldConstants'

const INITIAL_DATA = {
  world: null,
  isFetching: false,
  error: false,
  errorResponse: null
}

const worldReducer = (state = INITIAL_DATA, action) => {
  switch (action.type) {
    case GET_WORLD_START:
      return {
        ...state,
        isFetching: true,
        error: false,
        errorResponse: null
      }
    case GET_WORLD_SUCCESS:
      return {
        world: action.payload,
        isFetching: false,
        error: false,
        errorResponse: null
      };
    case GET_WORLD_FAILURE:
      return {
        world: null,
        isFetching: false,
        error: true,
        errorResponse: action.payload
      };
    case SAVE_WORLD_START:
      return {
        ...state,
        isFetching: true,
        error: false,
        errorResponse: null
      }
    case SAVE_WORLD_SUCCESS:
      return {
        world: action.payload,
        isFetching: false,
        error: false,
        errorResponse: null
      }
    case SAVE_WORLD_FAILURE:
      return {
        world: null,
        isFetching: false,
        error: true,
        errorResponse: action.payload
      }
    case UPDATE_WORLD_START:
      return {
        ...state,
        isFetching: true,
        error: false,
        textError: null
      }
    case UPDATE_WORLD_SUCCESS:
      return {
        world:action.payload,
        isFetching: false,
        error: false,
        errorResponse: null
      }
    case UPDATE_WORLD_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: true,
        errorResponse: action.payload
      }
    default:
      return { ...state };
  }
};

export default worldReducer;