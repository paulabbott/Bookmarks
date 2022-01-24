import React from 'react'

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
