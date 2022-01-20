import React, { useState, useContext } from "react";
import { FormProvider } from './FormProvider'
import StyledButton from "../UI/StyledButton";
import DisplayItem from './DisplayItem'
import EditForm from './EditForm'

//TODO: try here and then import from somewhere consitent
type Bookmark = {
    url: string,
    urlDesc: string,
    created: number
}

type props = {
    bookmark: Bookmark,
    editFunc: Function,
    deleteFunc: Function,
}

//display the form in onlyread mode
const EditableItem = ({ bookmark, editFunc, deleteFunc }: props) => {

    const [editing, setEditing] = useState(false)

    if (editing) {
        return <EditForm bookmark={bookmark} editFunc={editFunc} deleteFunc={deleteFunc} setEditing={setEditing} />
    } else {
        return (
            <DisplayItem bookmark={bookmark} setEditing={setEditing} />
        )
    }



}
export default EditableItem