import { combineReducers } from 'redux';

const initial =[]

const citiesList = (state = initial, action) => {
  switch (action.type) {
    case 'UPDATE_CITIES':
      return action.data;
    default:
      return state;
  }
};

const reducers = combineReducers({
  citiesList
});

export default reducers;
