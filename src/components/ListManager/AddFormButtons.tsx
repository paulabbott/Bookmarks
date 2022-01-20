import React, { useContext } from 'react';
import FormContext from './FormContext';
import StyledButton from '../UI/StyledButton'

const AddFormButtons = () => {
    const formValues = useContext(FormContext);
    const waiting = formValues.values.isWaiting
    return (
        <StyledButton key={'key' + 'addButton'} type='submit' wait={waiting} disabled={waiting}>
            {waiting ? 'wait' : 'add'}
        </StyledButton>
    )

}

export default AddFormButtons