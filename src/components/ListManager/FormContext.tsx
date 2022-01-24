import React from 'react'
import formValuesTypes from './FormInputs'

//useState<number | null>(null);
//useState<objType | null>(null);

//TODO: this doesn't quite feel right, could just be in FormProvider.tsx?
const emptyFormValues = {
    values: {
        url: '',
        urlDesc: '',
        validationMessage: ',',
        isWaiting: false
    },
    updateValues: (obj: object) => { } 
}

const FormContext = React.createContext(emptyFormValues);
export default FormContext
