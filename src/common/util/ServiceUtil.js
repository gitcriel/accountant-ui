import config from '../../config';

export default {
  postNoAuth,
  post,
  get,
  save,
  erase,
};

async function postNoAuth(URI, body) {
  const request = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(body),
  };
  const response = await fetch(config.SERVICE_URL + URI, request);
  return await handleResponse(response);
}

async function post(URI, body) {
  const request = {
    method: 'POST',
    headers: {'Content-Type': 'application/json', ...getAuth()},
    body: JSON.stringify(body),
  };
  const response = await fetch(config.SERVICE_URL + URI, request);
  return await handleResponse(response);
}

async function save(URI, id, body) {
  let uri = config.SERVICE_URL + URI;
  let method = 'POST';
  if (id !== undefined) {
    method = 'PUT';
    uri += '/' + id;
  }

  const request = {
    method: method,
    headers: {'Content-Type': 'application/json', ...getAuth()},
    body: JSON.stringify(body),
  };
  const response = await fetch(uri, request);
  return await handleResponse(response);
}

async function get(URI, id) {
  const request = {
    method: 'GET',
    headers: {'Content-Type': 'application/json', ...getAuth()},
  };
  let uri = config.SERVICE_URL + URI;
  if (id !== undefined) {
    uri += '/' + id;
  }

  const response = await fetch(uri, request);
  return await handleResponse(response);
}

async function erase(URI, id) {
  const request = {
    method: 'DELETE',
    headers: {'Content-Type': 'application/json', ...getAuth()},
  };
  let uri = config.SERVICE_URL + URI;
  if (id !== undefined) {
    uri += '/' + id;
  }

  const response = await fetch(uri, request);
  return await handleResponse(response);
}

function getAuth() {
  return {'Authorization': 'Custom ' + sessionStorage.getItem(config.SESSION_STORAGE_SESSION_TOKEN)};
}

function handleResponse(response) {
  return response.text().then((text) => {
    const data = text && JSON.parse(text);
    if (response.ok) {
      return data;
    }

    const error = data || response.statusText;
    return Promise.reject(error);
  });
}
