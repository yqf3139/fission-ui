import { createSelector } from 'reselect';
import { decodeBase64 } from 'utils/util';
/**
 * Direct selector to the FunctionsPage state domain
 */
const selectFunctionsPageDomain = () => (state) => state.get('functions');
const selectEnvironmentsPageDomain = () => (state) => state.get('environments');

const makeSelectFunctionByName = () => createSelector(
  selectFunctionsPageDomain(),
  (substate) => (functionName) => {
    const functionFound = substate.get('functions').find((func) => func.getIn(['metadata', 'name']) === functionName);
    if (functionFound) {
      return ({
        name: functionFound.getIn(['metadata', 'name']),
        uid: functionFound.getIn(['metadata', 'uid']),
        environment: functionFound.getIn(['environment', 'name']),
        code: decodeBase64(functionFound.get('code')),
        triggersHttp: substate.get('triggersHttp').filter((trigger) => trigger.getIn(['function', 'name']) === functionFound.getIn(['metadata', 'name'])).toJS(),
        triggersTimer: substate.get('triggersTimer').filter((trigger) => trigger.getIn(['function', 'name']) === functionFound.getIn(['metadata', 'name'])).toJS(),
        kubeWatchers: substate.get('kubeWatchers').filter((watcher) => watcher.getIn(['function', 'name']) === functionFound.getIn(['metadata', 'name'])).toJS(),
        triggersMQ: substate.get('triggersMQ').filter((trigger) => trigger.getIn(['function', 'name']) === functionFound.getIn(['metadata', 'name'])).toJS(),
        versions: substate.get('versions').toJS(),
      });
    }
    return false;
  }
);

const makeSelectLoading = () => createSelector(
  selectFunctionsPageDomain(),
  selectEnvironmentsPageDomain(),
  (substate, substateEnv) => substate.get('triggerHttpLoading') ||
                             substate.get('functionLoading') ||
                             substate.get('kubeWatcherLoading') ||
                             substate.get('triggerTimerLoading') ||
                             substate.get('triggerMQLoading') ||
                             substate.get('versionLoading') ||
                             substateEnv.get('loading')
);

const makeSelectError = () => createSelector(
  selectFunctionsPageDomain(),
  (substate) => substate.get('error')
);

const makeSelectFunctionTest = () => createSelector(
  selectFunctionsPageDomain(),
  (substate) => substate.get('functionTest').toJS()
);

const makeSelectFunctions = () => createSelector(
  selectFunctionsPageDomain(),
  (substate) => substate.get('functions').map((e) => ({
    name: e.getIn(['metadata', 'name']),
    environment: e.getIn(['environment', 'name']),
    triggersHttp: (substate.get('triggersHttp').filter((trigger) => trigger.getIn(['function', 'name']) === e.getIn(['metadata', 'name']))).toJS(), // TODO improve, simplify object
    triggersTimer: (substate.get('triggersTimer').filter((trigger) => trigger.getIn(['function', 'name']) === e.getIn(['metadata', 'name']))).toJS(), // TODO improve, simplify object
    triggersMQ: (substate.get('triggersMQ').filter((trigger) => trigger.getIn(['function', 'name']) === e.getIn(['metadata', 'name']))).toJS(), // TODO improve, simplify object
    kubeWatchers: (substate.get('kubeWatchers').filter((watcher) => watcher.getIn(['function', 'name']) === e.getIn(['metadata', 'name']))).toJS(),
    versions: (substate.get('versions')).toJS(),
  })).toJS()
);

const makeSelectTriggersHttp = () => createSelector(
  selectFunctionsPageDomain(),
  (substate) => substate.get('triggersHttp').toJS()
);

const makeSelectKubeWatchers = () => createSelector(
  selectFunctionsPageDomain(),
  (substate) => substate.get('kubeWatchers').toJS()
);

const makeSelectTriggersTimer = () => createSelector(
  selectFunctionsPageDomain(),
  (substate) => substate.get('triggersTimer').toJS()
);

const makeSelectTriggersMQ = () => createSelector(
  selectFunctionsPageDomain(),
  (substate) => substate.get('triggersMQ').toJS()
);

const makeSelectFunctionVersion = () => createSelector(
  selectFunctionsPageDomain(),
  (substate) => substate.get('functionVersion').toJS()
);

const makeSelectUploadFunctions = () => createSelector(
  selectFunctionsPageDomain(),
  (substate) => substate.get('uploadFunctions').toJS()
);

export {
  makeSelectFunctions,
  makeSelectTriggersHttp,
  makeSelectError,
  makeSelectLoading,
  makeSelectFunctionByName,
  makeSelectFunctionTest,
  makeSelectKubeWatchers,
  makeSelectTriggersTimer,
  makeSelectTriggersMQ,
  makeSelectFunctionVersion,
  makeSelectUploadFunctions,
};
