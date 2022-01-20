import React, { useContext } from "react";
import StyledButton from "../UI/StyledButton";

const DisplayItem = ({ bookmark, setEditing }: Props) => {

    const showForm = (e) => {
        e.preventDefault()
        setEditing(true)
    }

    return (
        <div>
            <a rel="noreferrer" target="_blank" href={bookmark.url}>{bookmark.url}</a> &nbsp; <StyledButton onClick={showForm}>edit</StyledButton>
        </div>
    )

}
export default DisplayItem
