const KEY_LOCALSTORAGE = 'user';

export const loadUser = (): { id: string, token: string } => {
  const serializedState = localStorage.getItem(KEY_LOCALSTORAGE);
  const parsedObject: {
    id: string,
    token: string,
  } = serializedState && JSON.parse(serializedState);
  return parsedObject;
};

export const saveUser = (data: { token: string, id: string }): void => {
  const { token, id } = data;
  const serializedState = JSON.stringify({ token, id });
  localStorage.setItem(KEY_LOCALSTORAGE, serializedState);
};

export const removeUser = () => {
  localStorage.removeItem(KEY_LOCALSTORAGE);
};
