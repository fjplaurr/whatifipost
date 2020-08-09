import React from 'react';
import { render, fireEvent, getByLabelText } from '@testing-library/react';
import Signin from './Signin.component';
var renderContainer = function () {
    var utils = render(React.createElement(Signin, null));
    var container = utils.getByTestId('signinContainer');
    return container;
};
test('elements are rendered', function () {
    var container = renderContainer();
    expect(container).toHaveTextContent('Email');
    expect(container).toHaveTextContent('Password');
    expect(container).toHaveTextContent('Sign in');
});
test('allows user to fill the inputs', function () {
    var container = renderContainer();
    // input Email
    var input = getByLabelText(container, 'Email');
    fireEvent.change(input, { target: { value: 'mockEmail' } });
    expect(input).toHaveValue('mockEmail');
    // input Password
    input = getByLabelText(container, 'Password');
    fireEvent.change(input, { target: { value: 'mockPassword' } });
    expect(input).toHaveValue('mockPassword');
});
