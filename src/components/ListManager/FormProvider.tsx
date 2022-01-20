import React, { useState, useContext } from "react";
import { ValidateUrlFormatPromise, checkUrlExists } from '../../services/validationRules'
import BookmarkEditBox from './BookmarkEditBox'
import validateField from '../../services/validateField'
import readTime from '../../services/readTime'
import StyledButton from '../UI/StyledButton'
import { Bookmark } from './ListManager'
import FormContext from "./FormContext";

//NOTE: this compent manages the data for the form state, including inputs, readOnly and isWaiting
//is wraps it's children in a form tag and a context provider so they can acess the values and the setter function

export const FormProvider = ({ initState, onSubmit, bookmark, children }) => {

    const [values, setValues] = useState<object>(() => {
        return (initState)
    })

    const validationRules = [ValidateUrlFormatPromise, checkUrlExists]

    //have to use prevState in setValues because of closures
    //ref: https://reactjs.org/docs/hooks-reference.html#usestate
    //TODO: look at what other people do, maybe you can just spread both objects together.
    const updateValues = (obj: object) => {
        //TODO: can we do better than 'as any'? Generic?
        let newValues = {} as any
        for (const [key, value] of Object.entries(obj)) {
            newValues[key] = value
        }
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        updateValues({ isWaiting: true })
        const validationResult = await validateField(values.url, validationRules)
            .catch(v => {
                setTimedValidationMessage("sorry something went terribly wrong.")
            })
        updateValues({ isWaiting: false })
        if (validationResult.passedAll) {
            //onSuccess 
            onSubmit(values, updateValues)
        } else {
            setTimedValidationMessage(validationResult.messages[0].errorMessage)
            console.log('validation failed', validationResult.messages[0].errorMessages)
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

