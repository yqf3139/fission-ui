import { takeEvery, call, put, take, cancel } from 'redux-saga/effects';
import { catalogGet, catalogDelete, catalogPost } from 'utils/api';
import { LOCATION_CHANGE } from 'react-router-redux';
import * as C from 'containers/ServiceCatalogPage/constants';

function* loadSaga(action) {
  try {
    const data = yield call(catalogGet, action.category);
    yield put({ type: C.LOAD_SUCCESS, category: action.category, data });
  } catch (error) {
    yield put({ type: C.LOAD_ERROR, category: action.category, error });
  }
}

function* createSaga(action) {
  try {
    const data = yield call(catalogPost, action.category, action.item);
    yield put({ type: C.CREATE_SUCCESS, category: action.category, data });
  } catch (error) {
    yield put({ type: C.CREATE_ERROR, category: action.category, error });
  }
}

function* deleteSaga(action) {
  try {
    yield call(catalogDelete, action.category, action.item);
    yield put({ type: C.DELETE_SUCCESS, category: action.category, data: action.item });
  } catch (error) {
    yield put({ type: C.DELETE_ERROR, category: action.category, error });
  }
}

function makeSaga(topic, func) {
  return function* f() {
    const watcher = yield takeEvery(topic, func);

    // Suspend execution until location changes
    yield take(LOCATION_CHANGE);
    yield cancel(watcher);
  };
}

// All sagas to be loaded
export default [
  makeSaga(C.CREATE_REQUEST, createSaga),
  makeSaga(C.DELETE_REQUEST, deleteSaga),
  makeSaga(C.LOAD_REQUEST, loadSaga),
];
