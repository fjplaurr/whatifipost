import React from 'react';
import { render, getByLabelText, fireEvent, } from '@testing-library/react';
import Signup from './Signup.component';
var renderContainer = function () {
    var utils = render(React.createElement(Signup, null));
    var container = utils.getByTestId('signupContainer');
    return container;
};
test('elements are rendered', function () {
    var container = renderContainer();
    expect(container).toHaveTextContent('Name');
    expect(container).toHaveTextContent('Surname');
    expect(container).toHaveTextContent('Email');
    expect(container).toHaveTextContent('Password');
    expect(container).toHaveTextContent('Join');
});
test('allows user to fill the inputs', function () {
    var container = renderContainer();
    // input name
    var input = getByLabelText(container, 'Name');
    fireEvent.change(input, { target: { value: 'mockName' } });
    expect(input).toHaveValue('mockName');
    // input surname
    input = getByLabelText(container, 'Surname');
    fireEvent.change(input, { target: { value: 'mockSurname' } });
    expect(input).toHaveValue('mockSurname');
    // input Email
    input = getByLabelText(container, 'Email');
    fireEvent.change(input, { target: { value: 'mockEmail' } });
    expect(input).toHaveValue('mockEmail');
    // input Password
    input = getByLabelText(container, 'Password');
    fireEvent.change(input, { target: { value: 'mockPassword' } });
    expect(input).toHaveValue('mockPassword');
});
