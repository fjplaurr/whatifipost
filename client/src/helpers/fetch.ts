// Gets generic data
export const get = async (url: string, headers = {}) => {
  const request: RequestInit = {
    method: 'GET',
    headers: {
      ...headers,
    },
  };
  const response = await fetch(url, request);
  const json = await response.json();
  return json;
};

// Posts generic data
export const post = async (url: string, data: {}, headers = {}) => {
  const body = JSON.stringify(data);
  const request: RequestInit = {
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
export const put = async (url: string, data: {}, headers = {}) => {
  const body = JSON.stringify(data);
  const request: RequestInit = {
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
export const deleteById = async (url: string, headers = {}) => {
  const request: RequestInit = {
    method: 'DELETE',
    headers,
  };
  const response = await fetch(url, request);
  const json = await response.json();
  return json;
};

// Posts a file using FormData
export const postFile = async (url: string, file: File, headers = {}) => {
  const formData = new FormData();
  formData.append('image', file);
  const request: RequestInit = {
    method: 'POST',
    body: formData,
    headers,
  };
  const response = await fetch(url, request);
  const json = await response.json();
  return json;
};
