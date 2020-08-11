import React, { useState } from 'react';
import styles from './SearchBarTextInput.module.scss';
var SearchBarTextInput = function (_a) {
    var type = _a.type, onChange = _a.onChange, placeholder = _a.placeholder, minLength = _a.minLength, children = _a.children, _b = _a.color, color = _b === void 0 ? 'smokeWhite' : _b, idInput = _a.idInput, maxLength = _a.maxLength;
    var _c = useState(''), value = _c[0], setValue = _c[1];
    var stateChange = function (event) {
        onChange && onChange(event);
        setValue(event.target.value);
    };
    var inputClass = color === 'white' ? styles.inputWhite : styles.inputSmokeWhite;
    return (React.createElement("div", { className: styles.textInputWrapper },
        children && children,
        React.createElement("input", { className: inputClass, required: true, onChange: stateChange, value: value, type: type, minLength: minLength, id: idInput, maxLength: maxLength }),
        React.createElement("label", { className: styles.label, htmlFor: idInput }, placeholder)));
};
export default SearchBarTextInput;
