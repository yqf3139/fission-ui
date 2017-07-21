/*
 *
 * ServiceCatalogListPage actions
 *
 */

import * as C from 'containers/ServiceCatalogPage/constants';

export function createAction(category, item) {
  return {
    type: C.CREATE_REQUEST,
    category,
    item,
  };
}
export function removeAction(category, item) {
  return {
    type: C.DELETE_REQUEST,
    category,
    item,
  };
}
export function loadAction(category) {
  return {
    type: C.LOAD_REQUEST,
    category,
  };
}
