import Firebase from './../../utils/Firebase';
import * as types from './types';

export function fetchLatest() {
  return dispatch => {
    dispatch({ type: types.LATEST_FETCH })
    Firebase.database()
            .ref('v0/newstories')
            .limitToFirst(10)
            .once('value', snap => {
              const ids = snap.val();
              dispatch({ type: types.LATEST_SUCCESS, payload: ids });
              _onFetchLatest(dispatch, ids)
            });
  }
}

// Private functions

function _onFetchLatest(dispatch, ids) {
  ids.forEach(id => _fetchItem(dispatch, id));
}

function _fetchItem(dispatch, id) {
  Firebase.database()
          .ref('v0/item')
          .child(id)
          .once('value', snap => {
            const item = snap.val();
            dispatch({ type: types.ITEM_SUCCESS, payload: item });
          });
}