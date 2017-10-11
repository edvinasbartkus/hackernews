import Firebase from './../../utils/Firebase';
import * as types from './types';

export function fetchLatest() {
  return dispatch => {
    dispatch({ type: types.LATEST_FETCH })
    Firebase.database()
            .ref('v0/newstories')
            .limitToFirst(100)
            .once('value', snap => {
              const ids = snap.val();
              dispatch({ type: types.LATEST_SUCCESS, payload: ids });
              this._onFetchLatest(ids)
            });
  }
}

// Private functions

function _onFetchLatest(ids) {
  ids.forEach(id => _fetchItem(id));
}

function _fetchItem(id) {
  return dispatch => {
    Firebase.database()
            .ref('v0/item')
            .child(id)
            .once('value', snap => {
              const item = snap.val();
              dispatch({ type: types.ITEM_SUCCESS, payload: item });
            });
  }
}