import { combineReducers } from 'redux';
import plataformas from './DReducers/plataformas';
import users from './DReducers/users';
import faqs from './DReducers/faqs';
import wpps from './DReducers/wpps';

export default combineReducers({
    plataformas, faqs, wpps, users
})