import React, { useContext } from "react";
import StyledButton from "../UI/StyledButton";
import { BookmarkType } from '../../types/BookmarkType'

type props = {
    bookmark: BookmarkType,
    setEditing: Function
}

const DisplayItem = ({ bookmark, setEditing }: props) => {

    return (
        <div>
            <a rel="noreferrer" target="_blank" href={bookmark.url}>{bookmark.url}</a> &nbsp; <StyledButton onClick={() => setEditing(true)}>edit</StyledButton>
        </div>
    )

}
export default DisplayItem
