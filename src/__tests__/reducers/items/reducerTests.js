import * as types from './../../../reducers/items/types';
import reducer from './../../../reducers/items/reducer';

describe('Items reducer', () => {
  it('should get initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      ids: [],
      items: [],
      isLoading: false
    });
  });

  it('should handle LATEST_FETCH', () => {
    const action = { type: types.LATEST_FETCH };
    expect(reducer(undefined, action)).toEqual({
      ids: [],
      items: [],
      isLoading: true
    });
  });

  it('should handle LATEST_SUCCESS', () => {
    const state = {
      ids: [ 1 ],
      items: [],
      isLoading: true
    };

    const action = {
      type: types.LATEST_SUCCESS,
      payload: [ 1, 2, 3 ]
    };

    expect(reducer(state, action)).toEqual({
      ids: [ 1, 1, 2, 3 ],
      items: [],
      isLoading: false
    });
  });

  it('should handle ITEM_SUCCESS', () => {
    const state = {
      ids: [],
      items: [
        { title: 'Hello world!' }
      ],
      isLoading: false
    }

    const action = {
      type: types.ITEM_SUCCESS,
      payload: { title: 'Second world' }
    }

    expect(reducer(state, action)).toEqual({
      ids: [],
      items: [
        { title: 'Hello world!' },
        { title: 'Second world' }
      ],
      isLoading: false
    });
  });
});