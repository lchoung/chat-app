import { createStore } from 'redux';
import chatReducer from '../js/Reducer.js';

export const store = createStore(chatReducer);
