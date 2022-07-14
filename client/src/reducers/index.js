import { combineReducers } from 'redux';
import plataformas from './DReducers/plataformas';
import faqs from './DReducers/faqs';

export default combineReducers({
    plataformas, faqs
})