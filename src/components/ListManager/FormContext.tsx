import React from 'react'
import formValuesTypes from './FormInputs'

//useState<number | null>(null);
//useState<objType | null>(null);

//TODO: this doesn't quite feel right
const emptyFormValues = {
    values: {
        url: '',
        urlDesc: '',
        validationMessage: ',',
        isWaiting: false
    },
    updateValues: () => { }
}

const FormContext = React.createContext(emptyFormValues);
export default FormContext
