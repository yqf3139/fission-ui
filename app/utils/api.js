/**
 * Created by damien on 23/02/2017.
 */
import axios from 'axios';

const basePath = '/proxy/controller/v1/';
const routerPath = '/proxy/router';
const catalogPath = '/proxy/catalog/apis/servicecatalog.k8s.io/v1alpha1/';
const prometheusPath = '/proxy/prometheus';

/**
 * Parses the JSON returned by a network request
 *
 * @param  {object} response A response from a network request
 *
 * @return {object}          The parsed JSON from the request
 */
function parseJSON(response) {
  return response.data;
}

/**
 * Checks if a network request came back fine, and throws an error if not
 *
 * @param  {object} response   A response from a network request
 *
 * @return {object|undefined} Returns either the response, or throws an error
 */
function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

function buildFunction(item) {
  return { metadata: { name: item.name }, environment: { name: item.environment }, code: item.code };
}

export function getEnvironments() {
  return axios.get(`${basePath}environments`)
    .then(checkStatus)
    .then(parseJSON);
}
export function getEnvironment(name) {
  return axios.get(`${basePath}environments/${name}`)
    .then(checkStatus)
    .then(parseJSON);
}
export function removeEnvironment(environment) {
  return axios.delete(`${basePath}environments/${environment.name}`)
    .then(checkStatus)
    .then(parseJSON);
}
export function updateEnvironment(environment) {
  return axios.put(`${basePath}environments/${environment.name}`, { metadata: { name: environment.name }, runContainerImageUrl: environment.image })
    .then(checkStatus)
    .then(parseJSON)
    .then((response) => ({ runContainerImageUrl: environment.image, metadata: response }));
}
export function createEnvironment(environment) {
  return axios.post(`${basePath}environments`, { metadata: { name: environment.name }, runContainerImageUrl: environment.image })
    .then(checkStatus)
    .then(parseJSON)
    .then((response) => ({ runContainterImageUrl: environment.image, metadata: response }));
}

export function getFunctions() {
  return axios.get(`${basePath}functions`)
    .then(checkStatus)
    .then(parseJSON);
}

export function getFunction(name, uid) {
  return axios.get(`${basePath}functions/${name}${(uid ? `?uid=${uid}` : '')}`)
    .then(checkStatus)
    .then(parseJSON);
}

export function removeFunction(item) {
  return axios.delete(`${basePath}functions/${item.name}`)
    .then(checkStatus)
    .then(parseJSON);
}

export function putFunction(item) {
  return axios.put(`${basePath}functions/${item.name}`, buildFunction(item))
    .then(checkStatus)
    .then(parseJSON);
}

export function getTriggersHttp() {
  return axios.get(`${basePath}triggers/http`)
    .then(checkStatus)
    .then(parseJSON);
}

export function removeTriggerHttp(item) {
  return axios.delete(`${basePath}triggers/http/${item.metadata.name}`)
    .then(checkStatus)
    .then(parseJSON);
}

export function postTriggerHttp(item) {
  return axios.post(`${basePath}triggers/http`, item)
    .then(checkStatus)
    .then(parseJSON);
}

export function postFunction(item) {
  return axios.post(`${basePath}functions`, buildFunction(item))
    .then(checkStatus)
    .then(parseJSON);
}

export function restRequest(url, method, headers, params, body) {
  return axios({
    method: method.toLowerCase(),
    url: `${routerPath}${url}`,
    headers,
    params,
    data: body,
  }).catch((e) => e.response);
}

export function getKubeWatchers() {
  return axios.get(`${basePath}watches`)
    .then(checkStatus)
    .then(parseJSON);
}
export function removeKubeWatcher(item) {
  return axios.delete(`${basePath}watches/${item.metadata.name}`)
    .then(checkStatus)
    .then(parseJSON);
}
export function postKubeWatcher(item) {
  return axios.post(`${basePath}watches`, item)
    .then(checkStatus)
    .then(parseJSON);
}

export function getTriggersTimer() {
  return axios.get(`${basePath}triggers/time`)
    .then(checkStatus)
    .then(parseJSON);
}
export function removeTriggerTimer(item) {
  return axios.delete(`${basePath}triggers/time/${item.metadata.name}`)
    .then(checkStatus)
    .then(parseJSON);
}
export function postTriggerTimer(item) {
  return axios.post(`${basePath}triggers/time`, item)
    .then(checkStatus)
    .then(parseJSON);
}
export function getTriggersMQ() {
  return axios.get(`${basePath}triggers/messagequeue`)
    .then(checkStatus)
    .then(parseJSON);
}
export function removeTriggerMQ(item) {
  return axios.delete(`${basePath}triggers/messagequeue/${item.metadata.name}`)
    .then(checkStatus)
    .then(parseJSON);
}
export function postTriggerMQ(item) {
  return axios.post(`${basePath}triggers/messagequeue`, item)
    .then(checkStatus)
    .then(parseJSON);
}

export function catalogGet(category) {
  let path = category;
  const ns = window.fissionNamespace || 'fission';
  if (category !== 'serviceclasses' && category !== 'brokers') {
    path = `namespaces/${ns}/${category}`;
  }
  return axios.get(`${catalogPath}${path}`)
    .then(checkStatus)
    .then(parseJSON);
}

export function catalogPost(category, item) {
  let path = category;
  const ns = window.fissionNamespace || 'fission';
  if (category !== 'serviceclasses' && category !== 'brokers') {
    path = `namespaces/${ns}/${category}`;
  }
  return axios.post(`${catalogPath}${path}`, item)
    .then(checkStatus)
    .then(parseJSON);
}
export function catalogDelete(category, item) {
  let path = category;
  const ns = window.fissionNamespace || 'fission';
  if (category !== 'serviceclasses' && category !== 'brokers') {
    path = `namespaces/${ns}/${category}`;
  }
  return axios.delete(`${catalogPath}${path}/${item.metadata.name}`)
    .then(checkStatus)
    .then(parseJSON);
}

export function getFunctionVersions(name) {
  return axios.get(`${basePath}functions/${name}/versions`)
    .then(checkStatus)
    .then(parseJSON);
}

export function queryPrometheus(query) {
  return axios.get(`${prometheusPath}/api/v1/query?query=${query}`)
    .then(checkStatus)
    .then(parseJSON);
}
