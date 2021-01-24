const KEY_LOCALSTORAGE = 'user';

const loadUser = (): { id: string, token: string } => {
  const serializedState = localStorage.getItem(KEY_LOCALSTORAGE);
  const parsedObject: {
    id: string,
    token: string,
  } = serializedState && JSON.parse(serializedState);
  return parsedObject;
};

const saveUser = (data: { token: string, id: string }): void => {
  const { token, id } = data;
  const serializedState = JSON.stringify({ token, id });
  localStorage.setItem(KEY_LOCALSTORAGE, serializedState);
};

const removeUser = () => {
  localStorage.removeItem(KEY_LOCALSTORAGE);
};

const getHeadersIfLocalStorage = (): { authorization: string } | undefined => {
  const userLocalStorage = loadUser();
  if (userLocalStorage) {
    return {
      authorization: `Bearer ${userLocalStorage.token}`,
    };
  }
  return undefined;
};

export {
  loadUser, saveUser, removeUser, getHeadersIfLocalStorage,
};
