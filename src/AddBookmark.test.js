import React from 'react';
import { render, screen } from '@testing-library/react'
// import userEvent from '@testing-library/user-event'
import AddBookmark from './AddBookmark'

it('have correct fields and button', () => {
    render(<AddBookmark />);

    const usernameField = screen.getByLabelText(/url:/i)
    const passwordField = screen.getByLabelText(/notes/i)
    const submitButton = screen.getByText(/add/i)

    expect(usernameField).toBeInTheDocument();
    expect(passwordField).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
})

// it('should allow the user to submit creds', () => {
//     const submit = jest.fn()
//     render(<LoginForm submit={submit} />);
//     //could these be global? 
//     const usernameField = screen.getByLabelText(/username/i)
//     const passwordField = screen.getByLabelText(/password/i)
//     const submitButton = screen.getByText(/submit/i)
//     userEvent.type(usernameField, "paul")
//     userEvent.type(passwordField, "password1234")
//     userEvent.click(submitButton)
//     expect(submit).toHaveBeenCalledWith({
//         username: "paul",
//         password: "password1234"
//     })
// })
