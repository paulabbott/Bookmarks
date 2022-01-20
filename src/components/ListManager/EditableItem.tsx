import React, { useState, useContext } from "react";
import { FormProvider } from './FormProvider'
import StyledButton from "../UI/StyledButton";
import DisplayItem from './DisplayItem'
import EditItemForm from './EditItemForm'

//display the form in onlyread mode
const EditableItem = ({ bookmark, editFunc, deleteFunc }) => {

    const [editing, setEditing] = useState(false)

    if (editing) {
        return <EditItemForm bookmark={bookmark} editFunc={editFunc} deleteFunc={deleteFunc} setEditing={setEditing} />
    } else {
        return (
            <DisplayItem bookmark={bookmark} setEditing={setEditing} />
        )
    }



}
export default EditableItem