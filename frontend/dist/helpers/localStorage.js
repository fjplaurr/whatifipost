var loadUser = function () {
    var serializedState = localStorage.getItem('user');
    var parsedObject = serializedState && JSON.parse(serializedState);
    return parsedObject;
};
var saveUser = function (id) {
    var serializedState = JSON.stringify({ id: id });
    localStorage.setItem('user', serializedState);
};
export { loadUser, saveUser };
