import React, { useState } from "react";
import { ValidateUrlFormatPromise, checkUrlExists } from '../../helpers/validationRules'
import BookmarkEditBox from './BookmarkEditBox'
import validateField from '../../helpers/validateField'
import readTime from '../../helpers/readTime'
import FormContext from "./FormContext";
import { ValidationResultType } from '../../types/validation'
import { formValuesType } from '../../types/formValuesType'

//NOTE: this compent manages the data for the form state, including inputs, readOnly and isWaiting
//is wraps it's children in a form tag and a context provider so they can acess the values and the setter function

type Props = {
    initState: formValuesType,
    onSuccess: Function,
    children: React.ReactNode
}

export const FormProvider = ({ initState, onSuccess, children }: Props) => {

    const [values, setValues] = useState(() => {
        return (initState)
    })

    const validationRules = [ValidateUrlFormatPromise, checkUrlExists]

    //have to use prevState in setValues because of closures
    //ref: https://reactjs.org/docs/hooks-reference.html#usestate
    //TODO: look at what other people do, maybe you can just spread both objects together.
    //TODO: or use useReducer
    const updateValues = (obj: object) => {
        //TODO: can we do better than 'as any'? Generic?
        let newValues = {} as any
        for (const [key, value] of Object.entries(obj)) {
            newValues[key] = value
        }
        //TODO:Q setValues type returns void which means this function also return void. How do I type that.
        setValues(prevState => {
            return { ...prevState, ...newValues };
        });
    }

    //TODO: move to a validation/flashMessages component
    const setTimedValidationMessage = (flashMessage = "") => {
        updateValues({ validationMessage: flashMessage })
        const delay = readTime(flashMessage)
        setTimeout(() => { updateValues({ validationMessage: '' }) }, delay * 3)
    }

    //runs the validation and if it passes calls the passed in onSuccess funciton.
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        updateValues({ isWaiting: true })
        //TODO:Q can't get typescript to stop defaulting to | void, maybe because the asyncForEach doesn't return a Promise
        //validateField runs all the rules asyncronsly. and returns an object with passedAll true/false
        //and the validation messages if there are any.
        const validationResult: ValidationResultType = await validateField(values.url, validationRules)
        updateValues({ isWaiting: false })
        if (validationResult.passedAll) {
            onSuccess(values, updateValues)
        } else {
            setTimedValidationMessage(validationResult.ruleResults[0].errorMessage)
            console.log('validation failed', validationResult.ruleResults[0].errorMessage)
        }
    }

    return (
        <FormContext.Provider value={{ values, updateValues }}>
            <BookmarkEditBox>
                <form onSubmit={e => { handleSubmit(e) }}>
                    {children}
                </form>
            </BookmarkEditBox>
        </FormContext.Provider>
    )

}

export default FormProvider