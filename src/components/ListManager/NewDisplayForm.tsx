import React, { useState } from "react";
import { ValidateUrlFormatPromise, checkUrlExists } from '../../services/validationRules'
import BookmarkEditBox from './BookmarkEditBox'
import validateField from '../../services/validateField'
import readTime from '../../services/readTime'
import StyledButton from '../UI/StyledButton'
import { Bookmark } from './ListManager'
import { isPropertySignature } from "typescript";

export const NewDisplayForm = ({ initState, onSubmit, styledButtons, bookmark, children }) => {

    const [values, setValues] = useState<object>(() => {
        return (initState)
    })

    const validationRules = [ValidateUrlFormatPromise, checkUrlExists]

    //TODO: make this generic and also pass in the setValues funciton?
    //TODO: can this be swapped for useReducer?
    const updateValues = (obj: object) => {
        console.log('NDF in updateValues with', obj)
        //TODO: can we do better than 'as any'? Generic?
        let newValues = {} as any
        for (const [key, value] of Object.entries(obj)) {
            newValues[key] = value

        }
        //have to pass prevState, cos closures
        //ref: https://reactjs.org/docs/hooks-reference.html#usestate
        setValues(prevState => {
            return { ...prevState, ...newValues };
        });
    }

    const setTimedValidationMessage = (flashMessage = "") => {
        // setValidationMessage(flashMessage)
        updateValues({ validationMessage: flashMessage })
        const delay = readTime(flashMessage)
        setTimeout(() => { updateValues({ validationMessage: '' }) }, delay * 3)
    }

    const handleSubmit = async (e) => {
        console.log('called in new display form')
        e.preventDefault();
        updateValues({ isWaiting: true })
        const validationResult = await validateField(values.url, validationRules)
            .catch(v => {
                setTimedValidationMessage("sorry something went terribly wrong.")
            })
        updateValues({ isWaiting: false })
        if (validationResult.passedAll) {
            //TODO: rename onClickFunc?
            onSubmit(bookmark, updateValues)
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
                    {FormInputFields(values, updateValues)}
                    {styledButtons(values, updateValues)}
                </form>
            </BookmarkEditBox>
        )
    }

    //NOTE: conditional rendering but hooks always get called. 
    // return values.showForm ? formView() : readView()

    return (
        <div>
            <form onSubmit={e => { handleSubmit(e) }}>
                {React.Children.map(children, child => {
                    return React.cloneElement(child, { values: values, updateValues: updateValues })
                })}
            </form>
            <hr />
        </div >
    );



}

