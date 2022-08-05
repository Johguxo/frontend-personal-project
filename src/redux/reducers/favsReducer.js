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


const INIIAL_DATA = {
  favs: [],
  isFetching: false,
  error: false,
  errorResponse: null
}

const favsReducer = (state = INIIAL_DATA, action) => {
  switch (action.type) {
    case GET_FAVS_START:
      return {
        ...state,
        favs: [],
        isFetching: true,
        error: false,
        errorResponse: null,
      }
    case GET_FAVS_SUCCESS:
      return {
        ...state,
        favs: action.payload,
        isFetching: false,
        error: false,
        errorResponse: null,
      };
    case GET_FAVS_FAILURE:
      return {
        ...state,
        favs: [],
        isFetching: false,
        error: true,
        errorResponse: action.payload,
      };
    case NEW_FAV_SUCCESS:
      return {
        ...state,
        favs: [...state.favs, action.payload],
        isFetching: false,
        error: false,
        errorResponse: null,
      };
    case NEW_FAV_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: true,
        errorResponse: action.payload,
      };
    case ADD_ITEM_FAV_SUCCESS:
      return {
        ...state,
        favs: state.favs.map(fav => fav._id === action.payload._id ? action.payload : fav),
        isFetching: false,
        error: false,
        errorResponse: null,
      }
    case ADD_ITEM_FAV_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: true,
        errorResponse: action.payload,
      }
    case UPDATE_ITEM_FAV_SUCCESS:
      return {
        ...state,
        favs: state.favs.map(fav => fav._id === action.payload._id ? action.payload : fav),
        isFetching: false,
        error: false,
        errorResponse: null,
      }
    case UPDATE_ITEM_FAV_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: true,
        errorResponse: action.payload,
      }
    default:
      return { ...state};
  }
};

export default favsReducer;