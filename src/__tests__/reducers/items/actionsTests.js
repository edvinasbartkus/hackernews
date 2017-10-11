jest.mock('./../../../utils/Firebase');

import * as types from './../../../reducers/items/types';
import * as actions from './../../../reducers/items/actions';
import Firebase from './../../../utils/Firebase';

jest.mock('./../../../reducers/items/actions');
const originalActions = require.requireActual('./../../../reducers/items/actions');

describe('fetchLatest()', () => {
  it('should be able to listen for newstories from Firebase', () => {
    const ids = [ ];
    const valFn = jest.fn(() => ids);
    const onceFn = jest.fn((value, cb) => cb({ val: valFn }));
    const refFn = jest.fn(() => ({ once: onceFn }));

    Firebase.database = jest.fn(() => ({ ref: refFn }));

    const dispatch = jest.fn();
    originalActions.fetchLatest()(dispatch);

    expect(dispatch).toBeCalledWith({ type: types.LATEST_FETCH });
    expect(refFn).toBeCalledWith('v0/newstories');
  });
});

describe('searchForStories()', () => {
  it('should search for top stories by looking at lower ids', () => {
    const dispatch = jest.fn();
    const getState = jest.fn(() => ({ ids: [ 300 ] }));
    
    _mockFirebase();
    originalActions.searchForStories()(dispatch, getState);

    expect(dispatch).toBeCalledWith({
      type: types.LOADING_START
    });
  });
});

function _mockFirebase() {
  const onceFn = jest.fn(() => ({ parent: undefined, title: 'Hello world!' }));
  const childFn = jest.fn(() => ({ once: onceFn }));
  const refFn = jest.fn(() => ({ child: childFn }));
  Firebase.database = jest.fn(() => ({ ref: refFn }));
}