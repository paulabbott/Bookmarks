import React, { useContext } from 'react';
import FormContext from './FormContext';

//NOTE: contains the input fields of the form which are common to both AddItemForm and EditItem(Form)
// gains access to the values and update function using useContext

export default () => {

    const formValues = useContext(FormContext);

    //generic handleChange funciton for all inputs
    const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        formValues.updateValues({ [event.target.id]: event.target.value })
    }

    return (
        <React.Fragment>
            <label htmlFor='url'>url:</label>
            <input
                id='url'
                type='text'
                value={formValues.values.url}
                onChange={handleChange}
            />
            &nbsp;<span>{formValues.values.validationMessage}</span>
            <br />
            <label htmlFor='urlDesc'>notes:</label>
            <input
                id='urlDesc'
                type='text'
                value={formValues.values.urlDesc}
                onChange={handleChange}
            />
            <br />
        </React.Fragment>
    )
}