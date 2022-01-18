import React, { useState } from "react";
import { ValidateUrlFormatPromise, checkUrlExists } from '../../services/validationRules'
import BookmarkEditBox from './BookmarkEditBox'
import validateField from '../../services/validateField'
import readTime from '../../services/readTime'
import StyledButton from '../UI/StyledButton'
import { Bookmark } from './ListManager'

export const DisplayForm = ({ initState, onSubmit, bookmark, children }) => {

    const [values, setValues] = useState<object>(() => {
        return (initState)
    })

    const validationRules = [ValidateUrlFormatPromise, checkUrlExists]

    //have to use prevState in setValues because of closures
    //ref: https://reactjs.org/docs/hooks-reference.html#usestate
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

    //TODO: move to a validation component
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

    //display the form in onlyread mode
    const readView = () => {
        return (
            <div>
                <a rel="noreferrer" target="_blank" href={bookmark.url}>{bookmark.url}</a>
                &nbsp;<StyledButton onClick={() => updateValues({ showForm: true })}>edit</StyledButton>
            </div>
        )
    }

    //display the form inputs and the custom buttons.
    const formView = () => {
        return (
            <BookmarkEditBox>
                <form onSubmit={e => { handleSubmit(e) }}>
                    {React.Children.map(children, child => {
                        return React.cloneElement(child, { values: values, updateValues: updateValues })
                    })}
                </form>
            </BookmarkEditBox>
        )
    }

    //NOTE: conditional rendering but hooks always get called. 
    return values.showForm ? formView() : readView()
}

