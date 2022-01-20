import React, { useContext } from 'react';
import styled from 'styled-components'
import { FormProvider } from './FormProvider'
import FormInputFields from './FormInputs'
import EditFormButtons from './EditFormButtons'

type Bookmark = {
  url: string,
  urlDesc: string,
  created: number
}

//TODO: change bookmark to be Bookmark | null - ?
type Props = {
  className: string,
  bookmark: Bookmark,
  editFunc: Function,
  deleteFunc: Function,
  setEditing: Function
}

//NOTE: className allows it to be wrapped in a styled component
const EditItemFormComponent = ({ className, bookmark, editFunc, deleteFunc, setEditing }: Props) => {

  const initState = {
    url: bookmark.url,
    urlDesc: bookmark.urlDesc,
    isWaiting: false,
    validationMessage: ''
  }

  //TODO: try and move to file.
  type valuesType = {
    url: string,
    urlDesc: string
  }

  const onSuccess = (values: valuesType, updateValues: Function) => {
    //create a new bookmark and pass it back to update the main data store
    const updateBookmark = {
      url: values.url,
      urlDesc: values.urlDesc,
      created: bookmark.created
    }
    editFunc(updateBookmark)
    setEditing(false)
  }

  //TODO: setEditing => toggleForm? OpenForm(ture) editMode(false)
  return (
    <FormProvider initState={initState} onSuccess={onSuccess}>
      <FormInputFields />
      <EditFormButtons deleteFunc={deleteFunc} bookmark={bookmark} setEditing={setEditing} />
    </FormProvider>
  );

}

//TODO: move to the components folder?
const EditItemForm = styled(EditItemFormComponent)`
  border-bottom: 1px solid lightgrey;
  margin:4px 0 4px 0;
  padding: 0 0 4px 0;
`;

export default EditItemForm;

