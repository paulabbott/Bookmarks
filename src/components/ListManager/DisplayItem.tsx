import React, { useContext } from "react";
import StyledButton from "../UI/StyledButton";

//TODO: try here and then import from somewhere consitent
type Bookmark = {
    url: string,
    urlDesc: string,
    created: number
}

type props = {
    bookmark: Bookmark,
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
