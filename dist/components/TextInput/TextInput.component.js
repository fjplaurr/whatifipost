import React, { useState, useRef, useEffect, } from 'react';
import styles from './TextInput.module.scss';
var TextInput = function (_a) {
    var type = _a.type, onChange = _a.onChange, placeholder = _a.placeholder, minLength = _a.minLength, _b = _a.color, color = _b === void 0 ? 'smokeWhite' : _b, idInput = _a.idInput;
    var _c = useState(''), value = _c[0], setValue = _c[1];
    var stateChange = function (event) {
        onChange && onChange(event);
        setValue(event.target.value);
    };
    // Refes for label and input elements.
    var labelRef = useRef(null);
    var inputRef = useRef(null);
    // Changes label's className to be able to put it on top of the input when it is
    // not focused but contains data writen by the user.
    useEffect(function () {
        var _a;
        if ((_a = inputRef.current) === null || _a === void 0 ? void 0 : _a.value) {
            labelRef.current.className = styles.label + " " + styles.labelOnTop;
        }
        else {
            labelRef.current.className = "" + styles.label;
        }
    }, [value]);
    return (React.createElement("div", { className: styles.textInputWrapper },
        React.createElement("input", { className: color === 'white' ? styles.inputWhite : styles.inputSmokeWhite, required: true, onChange: stateChange, value: value, type: type, minLength: minLength, ref: inputRef, id: idInput }),
        React.createElement("label", { ref: labelRef, htmlFor: idInput }, placeholder)));
};
export default TextInput;
