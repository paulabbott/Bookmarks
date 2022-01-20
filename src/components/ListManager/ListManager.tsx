
import React, { useState, useEffect} from 'react';
import ItemList from './ItemList';
import AddItemForm from './AddItemForm'
import StyledButton from '../UI/StyledButton'
import StyledSection from '../UI/StyledSection'

// TODO: move this to a seperte file?
export interface Bookmark {
    url: string,
    urlDesc: string,
    created: number
}

//could pass UID down (or use context) to guarantee unquie keys
//if the compent is self contained in it's own right I think react will handle this for us.
type Props = {
    UID: string
  }

//use React.FC to type components or JSX.element - ?
const ListManager = ({ UID }: Props ) => {
    
    //NOTE: using a function to set inital value from localStorage
    const [bookmarks, setBookmarks] = useState(() => {
        const saved: string | null = localStorage.getItem(UID + "List");
        const initialValue: any[] = saved ? JSON.parse(saved) : []
        return initialValue;
    });

    useEffect(() => {
        localStorage.setItem(UID + "List", JSON.stringify(bookmarks));
    }, [UID, bookmarks]);

    const addBookmark = (bookmark: Bookmark) => {
        setBookmarks([...bookmarks, bookmark]);
    }

    // Use the created timestamp to match the bookmark and update it with the new one
    const editBookmark = (newBookmark: Bookmark) => {
        const updatedBookmarks = bookmarks.map((item) => {
            return (item.created === newBookmark.created) ? newBookmark : item
        })
        setBookmarks(updatedBookmarks);
    }

    const deleteBookmark = (bookmark: Bookmark) => {
        const updated = bookmarks.filter((item) => {
            //return everything except matched
            return (item.created !== bookmark.created)
        });
        setBookmarks(updated);
    }

    const deleteAllClick = () => {
        setBookmarks([]);
    }

    //NOTE: this file manages the global data object for the Bookmarks
    //reads and writes in localStorage when ever it changes and passes it down using props into the ItemList
    //could bundle all the functions up into an object, or use another useContext pattern - which would be nice.

    return (
        <StyledSection>
            <h1>{UID}</h1>
            <StyledButton onClick={deleteAllClick}>delete all</StyledButton>
            <AddItemForm addFunc={addBookmark} />
            <ItemList bookmarks={bookmarks} editFunc={editBookmark} deleteFunc={deleteBookmark} />
            <hr />
        </StyledSection>
    );
}

export default ListManager;
