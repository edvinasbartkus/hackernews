jest.mock('./../../../utils/Firebase');
import * as types from './../../../reducers/items/types';
import * as actions from './../../../reducers/items/actions';
import Firebase from './../../../utils/Firebase';

describe('Items actions', () => {
  it('should be able to listen for newstories from Firebase', () => {
    const ids = [ 1, 2, 3 ];
    const valFn = jest.fn(() => ids);
    const onceFn = jest.fn((value, cb) => cb({ val: valFn }));
    const limitFn = jest.fn(() => ({ once: onceFn }));
    const refFn = jest.fn(() => ({ limitToFirst: limitFn }));
    Firebase.database = jest.fn(() => ({ ref: refFn }));
    
    const dispatch = jest.fn();
    actions.fetchLatest()(dispatch);

    expect(dispatch).toBeCalledWith({ type: types.LATEST_FETCH });
    expect(refFn).toBeCalledWith('v0/newstories');
    expect(limitFn).toBeCalledWith(100);
    expect(dispatch).toBeCalledWith({ type: types.LATEST_SUCCESS, payload: ids })
  });
});