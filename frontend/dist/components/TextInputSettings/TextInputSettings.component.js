import React, { useState, useEffect } from 'react';
import styles from './TextInputSettings.module.scss';
var TextInputSettings = function (_a) {
    var type = _a.type, onChange = _a.onChange, placeholder = _a.placeholder, minLength = _a.minLength, initialValue = _a.initialValue, idInput = _a.idInput, textLabel = _a.textLabel, maxLength = _a.maxLength;
    var _b = useState(''), value = _b[0], setValue = _b[1];
    // Sets initial value if it is provided
    useEffect(function () {
        initialValue && setValue(initialValue);
    }, [initialValue]);
    var stateChange = function (event) {
        onChange && onChange(event);
        setValue(event.target.value);
    };
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: styles.container },
            React.createElement("label", { className: styles.label, htmlFor: idInput }, textLabel),
            React.createElement("input", { id: idInput, className: styles.input, placeholder: placeholder, required: true, onChange: stateChange, value: value, type: type, minLength: minLength, maxLength: maxLength }))));
};
export default TextInputSettings;
