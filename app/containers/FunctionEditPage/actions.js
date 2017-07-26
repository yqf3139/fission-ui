import {
  GET_FUNCTION_REQUEST,
  LOAD_TRIGGERSHTTP_REQUEST,
  DELETE_TRIGGERHTTP_REQUEST,
  UPDATE_FUNCTION_REQUEST,
  CREATE_TRIGGERHTTP_REQUEST,
  CREATE_FUNCTION_REQUEST,
  CREATE_KUBEWATCHER_REQUEST,
  DELETE_KUBEWATCHER_REQUEST,
  LOAD_KUBEWATCHERS_REQUEST,
  LOAD_TRIGGERSTIMER_REQUEST,
  DELETE_TRIGGERTIMER_REQUEST,
  CREATE_TRIGGERTIMER_REQUEST,
  LOAD_TRIGGERSMQ_REQUEST,
  DELETE_TRIGGERMQ_REQUEST,
  CREATE_TRIGGERMQ_REQUEST,
  LOAD_VERSIONS_REQUEST,
} from 'containers/FunctionsPage/constants';


export function getFunctionAction(name) {
  return {
    type: GET_FUNCTION_REQUEST,
    name,
  };
}

export function getFunctionVersionAction(name) {
  return {
    type: LOAD_VERSIONS_REQUEST,
    name,
  };
}

export function loadTriggersHttpAction() {
  return {
    type: LOAD_TRIGGERSHTTP_REQUEST,
  };
}

export function deleteTriggerHttpAction(trigger) {
  return {
    type: DELETE_TRIGGERHTTP_REQUEST,
    trigger,
  };
}

export function updateFunctionAction(fn) {
  return {
    type: UPDATE_FUNCTION_REQUEST,
    fn,
  };
}

export function createTriggerHttpAction(trigger) {
  return {
    type: CREATE_TRIGGERHTTP_REQUEST,
    trigger,
  };
}

export function createFunctionAction(fn) {
  return {
    type: CREATE_FUNCTION_REQUEST,
    fn,
  };
}

export function createKubeWatcherAction(watcher) {
  return {
    type: CREATE_KUBEWATCHER_REQUEST,
    watcher,
  };
}

export function deleteKubeWatcherAction(watcher) {
  return {
    type: DELETE_KUBEWATCHER_REQUEST,
    watcher,
  };
}

export function loadKubeWatchersAction() {
  return {
    type: LOAD_KUBEWATCHERS_REQUEST,
  };
}

export function createTriggerTimerAction(trigger) {
  return {
    type: CREATE_TRIGGERTIMER_REQUEST,
    trigger,
  };
}

export function deleteTriggerTimerAction(trigger) {
  return {
    type: DELETE_TRIGGERTIMER_REQUEST,
    trigger,
  };
}

export function loadTriggersTimerAction() {
  return {
    type: LOAD_TRIGGERSTIMER_REQUEST,
  };
}


export function createTriggerMQAction(trigger) {
  return {
    type: CREATE_TRIGGERMQ_REQUEST,
    trigger,
  };
}

export function deleteTriggerMQAction(trigger) {
  return {
    type: DELETE_TRIGGERMQ_REQUEST,
    trigger,
  };
}

export function loadTriggersMQAction() {
  return {
    type: LOAD_TRIGGERSMQ_REQUEST,
  };
}
