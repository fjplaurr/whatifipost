import * as React from 'react';
import styles from './Button.module.scss';
var Button = function (_a) {
    var _b = _a.backgroundFull, backgroundFull = _b === void 0 ? false : _b, text = _a.text, color = _a.color, _c = _a.type, type = _c === void 0 ? 'button' : _c, onClick = _a.onClick, small = _a.small;
    var style = '';
    if (backgroundFull && color === 'blue') {
        style = styles.fullBlueButton;
    }
    if (backgroundFull && color === 'red') {
        style = styles.fullRedButton;
    }
    if (!backgroundFull && color === 'blue') {
        style = styles.emptyBlueButton;
    }
    if (!backgroundFull && color === 'red') {
        style = styles.emptyRedButton;
    }
    if (small) {
        style = style + " " + styles.smallButton;
    }
    return (React.createElement("button", { type: type, className: style, onClick: onClick }, text));
};
export default Button;
