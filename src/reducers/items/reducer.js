import * as types from './types';
import Immutable from 'seamless-immutable';

const initialState = Immutable({
  ids: [],
  items: [],

  isLoading: false
});

export default function(state = initialState, action) {
  switch(action.type) {
    case types.LATEST_FETCH:
      return Object.assign({}, state, {
        isLoading: true
      });
    
    case types.LATEST_SUCCESS:
      return Object.assign({}, state, {
        isLoading: false,
        ids: state.ids.concat(action.payload)
      });

    case types.ITEM_SUCCESS:
      return Object.assign({}, state, {
        item: state.items.concat([ action.payload ])
      });

    default: return state;
  }
}