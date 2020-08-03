// Gets generic data
const get = async (url: string) => {
  const response = await fetch(url);
  const json = await response.json();
  return json;
};

// Posts generic data
const post = async (url: string, data: {}) => {
  const body = JSON.stringify(data);
  const request = {
    method: 'POST',
    body,
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const response = await fetch(url, request);
  const json = await response.json();
  return json;
};

// Puts generic data
const put = async (url: string, data: {}) => {
  const body = JSON.stringify(data);
  const request = {
    method: 'PUT',
    body,
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const response = await fetch(url, request);
  const json = await response.json();
  return json;
};

// Deletes single file by id
const deleteById = async (url: string) => {
  const request = {
    method: 'DELETE',
  };
  const response = await fetch(url, request);
  const json = await response.json();
  return json;
};

// Posts a file using FormData
const postFile = async (url: string, file: File) => {
  const formData = new FormData();
  formData.append('image', file);
  const request = {
    method: 'POST',
    body: formData,
  };
  const response = await fetch(url, request);
  const json = await response.json();
  return json;
};

export {
  get, post, put, deleteById, postFile,
};
