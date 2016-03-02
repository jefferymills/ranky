import * as ActionTypes from '../actions';
import merge from 'lodash/merge';
import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';

function basicReducer(state = {}, action) {
  console.log(state, action);
  return state;
}

const rootReducer = combineReducers({
  basicReducer,
  routing,
});

export default rootReducer;
