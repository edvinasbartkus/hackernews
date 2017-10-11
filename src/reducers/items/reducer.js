import * as types from './types';
import Immutable from 'seamless-immutable';

const initialState = Immutable({
  ids: [],
  items: [],

  isLoading: false
});

export default function(state = initialState, action) {
  switch(action.type) {
    case types.RESET:
      return Immutable.merge(state, {
        ids: [],
        items: []
      });

    case types.LATEST_FETCH:
      return Immutable.merge(state, {
        isLoading: true
      });
    
    case types.LATEST_SUCCESS:
      return Immutable.merge(state, {
        ids: state.ids.concat(action.payload)
      });

    case types.ITEM_SUCCESS:
      if (action.payload == null) {
        return state;
      }

      return Immutable.merge(state, {
        items: state.items.concat([ action.payload ])
      });

    case types.LOADING_START:
      return Immutable.merge(state, {
        isLoading: true
      });

    case types.LOADING_STOP:
      return Immutable.merge(state, {
        isLoading: false
      });

    default: return state;
  }
}