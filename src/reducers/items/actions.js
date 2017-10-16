import Firebase from './../../utils/Firebase';
import * as types from './types';
import _ from 'underscore';
import Promise from 'bluebird';
import request from 'superagent';

export function fetchLatest() {
  return dispatch => {
    dispatch({ type: types.LATEST_FETCH })
    request('GET', 'https://hacker-news.firebaseio.com/v0/newstories.json')
      .end((err, res) => {
        dispatch({ type: types.RESET });
        _handleIds(dispatch, res.body);
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
  request('GET', `https://hacker-news.firebaseio.com/v0/item/${id}.json`)
    .end((err, res) => {
      const item = res.body;
      if (item && !item.parent && item.title) {
        dispatch({ type: types.ITEM_SUCCESS, payload: item });
      }

      resolve(item.id);
    });
}