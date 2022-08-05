import { combineReducers } from 'redux';
import worldReducer from './worldReducer';
import authReducer from './authReducer';
import noteReducer from './noteReducer';
import favsReducer from './favsReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    world: worldReducer,
    note: noteReducer,
    favs: favsReducer,
})

export default rootReducer;