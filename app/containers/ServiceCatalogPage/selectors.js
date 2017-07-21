import { createSelector } from 'reselect';

/**
 * Direct selector to the environmentEditPage state domain
 */
const selectEnvironmentsPageDomain = () => (state) => state.get('service-catalog');

const makeSelectLoading = () => createSelector(
  selectEnvironmentsPageDomain(),
  (substate) => substate.get('brokersLoading') ||
                substate.get('serviceclassesLoading') ||
                substate.get('instancesLoading') ||
                substate.get('bindingsLoading')
);

const makeSelectError = () => createSelector(
  selectEnvironmentsPageDomain(),
  (substate) => substate.get('error')
);

const makeSelectBrokers = () => createSelector(
  selectEnvironmentsPageDomain(),
  (substate) => substate.get('brokers').toJS()
);

const makeSelectServiceClasses = () => createSelector(
  selectEnvironmentsPageDomain(),
  (substate) => substate.get('serviceclasses').toJS()
);

const makeSelectInstances = () => createSelector(
  selectEnvironmentsPageDomain(),
  (substate) => substate.get('instances').toJS()
);

const makeSelectBindings = () => createSelector(
  selectEnvironmentsPageDomain(),
  (substate) => substate.get('bindings').toJS()
);

export {
  makeSelectBrokers,
  makeSelectServiceClasses,
  makeSelectInstances,
  makeSelectBindings,
  makeSelectError,
  makeSelectLoading,
};
