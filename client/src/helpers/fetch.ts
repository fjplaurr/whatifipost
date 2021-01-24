// Gets generic data
const get = async (url: string, headers = {}) => {
  const request = {
    method: 'GET',
    headers,
  };
  const response = await fetch(url, request);
  const json = await response.json();
  return json;
};

// Posts generic data
const post = async (url: string, data: {}, headers = {}) => {
  const body = JSON.stringify(data);
  const request = {
    method: 'POST',
    body,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  };
  const response = await fetch(url, request);
  const json = await response.json();
  return json;
};

// Puts generic data
const put = async (url: string, data: {}, headers = {}) => {
  const body = JSON.stringify(data);
  const request = {
    method: 'PUT',
    body,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  };
  const response = await fetch(url, request);
  const json = await response.json();
  return json;
};

// Deletes single file by id
const deleteById = async (url: string, headers = {}) => {
  const request = {
    method: 'DELETE',
    headers,
  };
  const response = await fetch(url, request);
  const json = await response.json();
  return json;
};

// Posts a file using FormData
const postFile = async (url: string, file: File, headers = {}) => {
  const formData = new FormData();
  formData.append('image', file);
  const request = {
    method: 'POST',
    body: formData,
    headers,
  };
  const response = await fetch(url, request);
  const json = await response.json();
  return json;
};

export {
  get, post, put, deleteById, postFile,
};
