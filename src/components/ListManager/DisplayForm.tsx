import React, { useState, useContext } from "react";
import { ValidateUrlFormatPromise, checkUrlExists } from '../../services/validationRules'
import BookmarkEditBox from './BookmarkEditBox'
import validateField from '../../services/validateField'
import readTime from '../../services/readTime'
import StyledButton from '../UI/StyledButton'
import { Bookmark } from './ListManager'
import { FormAndData } from "./Types/FormAndData";

//TODO: improve on any
type Props = {
    initState: any
    onSubmit: Function,
    FormInputFields: JSX.Element,
    StyledButtons: JSX.Element,
    bookmark: any
}


export const DisplayForm = ({ initState, onSubmit, FormInputFields, StyledButtons, bookmark, children }: Props) => {

    //this is the form state, data and display (ie showForm, isWaiting)
    //this is the data and the setData that I want to make make avaliable to the other form components
    const [values, setValues] = useState<FormAndData>(() => {
        return (initState)
    })

    const validationRules = [ValidateUrlFormatPromise, checkUrlExists]

    //TODO: make this generic and also pass in the setValues funciton?
    //TODO: can this be swapped for useReducer?
    const updateValues = (obj: object) => {
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
        console.log('called in display form')
        e.preventDefault();
        updateValues({ isWaiting: true })
        const validationResult = await validateField(values.url, validationRules)
            .catch(v => {
                setTimedValidationMessage("sorry something went terribly wrong.")
            })
        updateValues({ isWaiting: false })
        if (validationResult.passedAll) {
            //TODO: rename onClickFunc?
            onSubmit(values, updateValues)
        } else {
            setTimedValidationMessage(validationResult.messages[0].errorMessage)
            console.log('validation failed', validationResult.messages[0].errorMessages)
        }
    }

    //display the form in onlyread mode
    //TODO: I think these could be values rather than bookmark?
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
                    <FormInputFields values={values} updateValues={updateValues} />
                    <StyledButtons values={values} updateValues={updateValues} />
                </form>
            </BookmarkEditBox>
        )
    }

    //NOTE: conditional rendering but hooks always get called. 
    return values.showForm ? formView() : readView()

}

