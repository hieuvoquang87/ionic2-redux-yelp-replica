import { combineReducers } from 'redux';
import {yelpData} from './yelp-reducer';

export const rootReducer = combineReducers({
  yelpData: yelpData
});