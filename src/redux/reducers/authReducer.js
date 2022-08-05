import { ToastAndroid } from "react-native";
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

const INITIAL_DATA = {
  user: null,
  token: null,
  isFetching: false,
  error: false,
  errorResponse: null
}

const authReducer = (state = INITIAL_DATA, action) => {
  switch (action.type) {
    case USER_LOADING:
      return {
        ...state,
        isFetching: true,
        error: false,
        errorResponse: null
      }
    case USER_LOADED:
      return {
        user: action.payload,
        token: action.meta,
        isFetching: false,
        error: false,
        errorResponse: null
      }
    case USER_FAILURE:
      return {
        user: null,
        isFetching: false,
        error: true,
        errorResponse: action.payload
      }
    case LOGIN_START:
      return {
        user: null,
        token: null,
        isFetching: true,
        error: false,
        errorResponse: null
      };
    case LOGIN_SUCCESS:
      return {
        user: action.payload,
        token: action.meta,
        isFetching: false,
        error: false,
        errorResponse: null
      };
    case LOGIN_FAILURE:
      return {
        user: null,
        isFetching: false,
        error: true,
        errorResponse: action.payload
      };
    case LOGOUT:
      return {
        user: null,
        token: null,
        isFetching: false,
        error: false,
        errorResponse: null
      };
    case REGISTER_SUCCESS:
      return {
        user: action.payload,
        token: action.meta,
        isFetching: false,
        error: false,
        errorResponse: null
      }
    case REGISTER_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: true,
        errorResponse: action.payload
      }
    case UPDATE_PROFILE_START:
      return {
        ...state,
        isFetching: true,
        error: false,
        errorResponse: null
      }
    case UPDATE_PROFILE_SUCCESS:
      ToastAndroid.show("El perfil se actualizo con exito", ToastAndroid.SHORT);
      return {
        ...state,
        user: action.payload,
        isFetching: false,
        error: false,
        errorResponse: null
      }
    case UPDATE_PROFILE_FAILURE:
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

export default authReducer;