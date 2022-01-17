import React from 'react';
import styled from 'styled-components'
import { DisplayForm } from './DisplayForm'
import { Bookmark } from './ListManager';
import StyledButton from '../UI/StyledButton'
import FormInputFields from './FormInputFields'

//TODO: change bookmark to be Bookmark | null
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

  //this should probably be values rather than bookmark.
  const onSubmit = (bookmark, updateValues) => {
    editFunc(bookmark)
    updateValues({ showForm: false })
  }

  const deleteButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log('in deleteButtonClick', bookmark)
    deleteFunc(bookmark)
    //don't need any clean up form rerenders.
  }

  const cancelButtonClick = (e: React.MouseEvent<HTMLButtonElement>, updateValues) => {
    e.preventDefault();
    //don't need any function.
    console.log('closeForm please')
    updateValues({ showForm: false })
  }

  const EditFormButtons = ({ values, updateValues }) => {
    return (
      <React.Fragment>
        <StyledButton key='key-addButton' type='submit' wait={values.isWaiting} disabled={values.isWaiting}>
          {values.isWaiting ? 'wait' : 'submit'}
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


  //So ideally <FormInputFields/> and <EditFormButtons/> would be children of <DisplayForm/>

  return (
    <div className={className}>
      <DisplayForm
        initState={initState}
        onSubmit={onSubmit}
        bookmark={bookmark}
        FormInputFields={FormInputFields}
        StyledButtons={EditFormButtons} />
    </div>
  )

}

//TODO: move to the components folder?
//TODO:Q is React.FC right here?
const StyledBookmark = styled(Item)`
  border-bottom: 1px solid lightgrey;
  margin:4px 0 4px 0;
  padding: 0 0 4px 0;
`;

export default StyledBookmark;

