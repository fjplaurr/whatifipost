var getTimeInterval = function (a) {
    var seconds = Math.floor((Date.now() - a.getTime()) / 1000);
    var unit = 'second';
    var direction = 'ago';
    if (seconds < 0) {
        seconds = -seconds;
        direction = 'from now';
    }
    var value = seconds;
    if (seconds >= 31536000) {
        value = Math.floor(seconds / 31536000);
        unit = 'year';
    }
    else if (seconds >= 86400) {
        value = Math.floor(seconds / 86400);
        unit = 'day';
    }
    else if (seconds >= 3600) {
        value = Math.floor(seconds / 3600);
        unit = 'hour';
    }
    else if (seconds >= 60) {
        value = Math.floor(seconds / 60);
        unit = 'minute';
    }
    if (value !== 1) {
        unit = unit + "s";
    }
    return value + " " + unit + " " + direction;
};
export { getTimeInterval };
