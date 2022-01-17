import React from 'react';
import styled from 'styled-components'
import { DisplayForm } from './DisplayForm'
import { Bookmark } from './ListManager';
import StyledButton from '../UI/StyledButton'
import FormInputFields from './FormInputFields'

//TODO: change bookmark to be Bookmark | null - ?
type Props = {
  className: string,
  bookmark: Bookmark,
  editFunc: Function,
  deleteFunc: Function
}

//NOTE: className allows it to be wrapped in a styled component
const Item = ({ className, bookmark, editFunc, deleteFunc }: Props) => {

  const initState = {
    showForm: false,
    url: bookmark.url,
    urlDesc: bookmark.urlDesc,
    isWaiting: false,
    validationMessage: ''
  }

  const onSubmit = (values, updateValues) => {
    //create a new bookmark and pass it back to update the main data store
    const updateBookmark = {
      url: values.url,
      urlDesc: values.urlDesc,
      created: bookmark.created
    }
    editFunc(updateBookmark)
    updateValues({ showForm: false })
  }

  const deleteButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    deleteFunc(bookmark)
  }

  const cancelButtonClick = (e: React.MouseEvent<HTMLButtonElement>, updateValues: Function) => {
    e.preventDefault();
    updateValues({ showForm: false })
  }

  const EditFormButtons = ({ values, updateValues }) => {
    return (
      <React.Fragment>
        <StyledButton key={'key' + bookmark.created + 'submit'} type='submit' wait={values.isWaiting} disabled={values.isWaiting}>
          {values.isWaiting ? 'wait' : 'update'}
        </StyledButton>

        <StyledButton
          key={'key' + bookmark.created + 'delete'} onClick={(e) => deleteButtonClick(e)}>
          delete
        </StyledButton>

        <StyledButton
          key={'key' + bookmark.created + 'cancel'} onClick={(e) => cancelButtonClick(e, updateValues)}>
          cancel
        </StyledButton>
      </React.Fragment>
    )
  }

    //NOTE: pass bookmark so we can get 'created' as UID. 
    return (
      <DisplayForm initState={initState} onSubmit={onSubmit} bookmark={bookmark}>
        <FormInputFields />
        <EditFormButtons />
      </DisplayForm>
    );

}

//TODO: move to the components folder?
//TODO:Q is React.FC right here?
const StyledBookmark = styled(Item)`
  border-bottom: 1px solid lightgrey;
  margin:4px 0 4px 0;
  padding: 0 0 4px 0;
`;

export default StyledBookmark;

