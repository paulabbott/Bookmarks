import React, { useState } from "react";
import DisplayItem from './DisplayItem'
import EditForm from './EditForm'
import { BookmarkType } from '../../types/BookmarkType'


type props = {
    bookmark: BookmarkType,
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