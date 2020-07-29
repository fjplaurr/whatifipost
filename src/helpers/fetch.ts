const get = async (url: string) => {
  const response = await fetch(url);
  const json = await response.json();
  return json;
};

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

const deleteById = async (url: string) => {
  const request = {
    method: 'DELETE',
  };
  const response = await fetch(url, request);
  const json = await response.json();
  return json;
};

export {
  get, post, put, deleteById,
};
