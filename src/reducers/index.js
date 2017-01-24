import { combineReducers } from 'redux';
import CardsReducer from './cards.reducer'

const rootReducer = combineReducers({
  cards: CardsReducer
});

export default rootReducer;
