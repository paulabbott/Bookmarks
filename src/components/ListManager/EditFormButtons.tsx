import React, { useContext } from 'react'
import StyledButton from '../UI/StyledButton';
import FormContext from './FormContext'

const EditFormButtons = ({ deleteFunc, bookmark, setEditing }) => {

    const formValues = useContext(FormContext);

    const deleteButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        deleteFunc(bookmark)
    }

    const cancelButtonClick = (e: React.MouseEvent<HTMLButtonElement>, updateValues: Function) => {
        e.preventDefault();
        setEditing(false)
    }

    return (
        <React.Fragment>
            <StyledButton
                key={'key' + bookmark.created + 'submit'}
                type='submit' wait={formValues.values.isWaiting}
                disabled={formValues.values.isWaiting}>
                {formValues.values.isWaiting ? 'wait' : 'update'}
            </StyledButton>

            <StyledButton
                key={'key' + bookmark.created + 'delete'}
                onClick={(e) => deleteButtonClick(e)}>
                delete
            </StyledButton>

            <StyledButton
                key={'key' + bookmark.created + 'cancel'}
                onClick={(e) => cancelButtonClick(e,)}>
                cancel
            </StyledButton>
        </React.Fragment>
    )
}

export default EditFormButtons
