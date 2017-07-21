/*
 *
 * ServiceCatalogPage reducer
 *
 */

import { fromJS } from 'immutable';
import * as C from './constants';

const initialState = fromJS({
  brokers: [],
  serviceclasses: [],
  instances: [],
  bindings: [],
  brokersLoading: false,
  serviceclassesLoading: false,
  instancesLoading: false,
  bindingsLoading: false,
  error: false,
});

function serviceCatalogReducer(state = initialState, action) {
  switch (action.type) {
    case C.CREATE_REQUEST:
      return loadList(state, action.category);
    case C.CREATE_SUCCESS:
      return pushIntoList(state, action.category, action);
    case C.CREATE_ERROR:
      return setError(state, action.category, action);
    case C.DELETE_REQUEST:
      return loadList(state, action.category);
    case C.DELETE_ERROR:
      return setError(state, action.category, action);
    case C.DELETE_SUCCESS:
      return deleteFromList(state, action.category, action);
    case C.LOAD_REQUEST:
      clearList(state, action.category);
      return loadList(state, action.category);
    case C.LOAD_SUCCESS:
      return setList(state, action.category, action);
    case C.LOAD_ERROR:
      return setError(state, action.category, action);

    default:
      return state;
  }
}

function deleteFromList(state, category, action) {
  return state.set(category, state.get(category).filter((e) =>
    e.getIn(['metadata', 'name']) !== action.data.metadata.name
  )).set(`${category}Loading`, false);
}

function pushIntoList(state, category, action) {
  return state
    .update(category, (list) => list.push(fromJS(action.data)))
    .set(`${category}Loading`, false)
    .set('error', false);
}

function clearList(state, category) {
  return state
    .set(category, fromJS([]));
}

function loadList(state, category) {
  return state
    .set(`${category}Loading`, true)
    .set('error', false);
}

function setList(state, category, action) {
  return state
    .set(category, fromJS(action.data.items))
    .set(`${category}Loading`, false);
}

function setError(state, category, action) {
  return state
    .set('error', fromJS(action.error.response))
    .set(`${category}Loading`, false);
}

export default serviceCatalogReducer;
