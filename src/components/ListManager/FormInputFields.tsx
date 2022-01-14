import React from 'react';

const FormInputFields = (values, updateValues) => {

    //generic handleChange funciton for all inputs
    const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        updateValues({ [event.target.id]: event.target.value })
    }

    return (
        <React.Fragment>
            <label htmlFor='url'>url:</label>
            <input
                id='url'
                type='text'
                value={values.url}
                onChange={handleChange}
            />
            &nbsp;<span>{values.validationMessage}</span>
            <br />
            <label htmlFor='urlDesc'>notes:</label>
            <input
                id='urlDesc'
                type='text'
                value={values.urlDesc}
                onChange={handleChange}
            />
            <br />
        </React.Fragment>
    )
}

export default FormInputFields