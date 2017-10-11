import Firebase from './../../utils/Firebase';
import * as types from './types';
import _ from 'underscore';
import Promise from 'bluebird';

export function fetchLatest() {
  return dispatch => {
    dispatch({ type: types.LATEST_FETCH })
    Firebase.database()
            .ref('v0/newstories')
            .once('value', snap => {
              dispatch({ type: types.RESET });
              _handleIds(dispatch, snap.val());
            });
  }
}

export function searchForStories() {
  return (dispatch, getState) => {
    dispatch({ type: types.LOADING_START });

    const ids = getState().ids;
    const latest = _.min(ids) - 1;

    _handleIds(dispatch, Array.from(Array(200).keys()).map(i => latest - i));
  }
}

// Private functions; exported for testing
export function _handleIds(dispatch, ids) {
  const promises = ids.map(id => {
    return new Promise((resolve, reject) => {
      _fetchItem(dispatch, id, resolve);
    });
  });

  Promise.all(promises)
         .then((ids) => {
           dispatch({ type: types.LATEST_SUCCESS, payload: ids });
           dispatch({ type: types.LOADING_STOP });
          })
         .done();
}

function _fetchItem(dispatch, id, resolve) {
  Firebase.database()
          .ref('v0/item')
          .child(id)
          .once('value', snap => {
            const item = snap.val();
            if (item && !item.parent && item.title) {
              dispatch({ type: types.ITEM_SUCCESS, payload: item });
            }

            resolve(item.id);
          });
}