import React from 'react';
import styled from 'styled-components'
import FormProvider from './FormProvider'
import FormInputFields from './FormInputs'
import EditFormButtons from './EditFormButtons'
import { BookmarkType } from '../../types/BookmarkType'
import { formValuesType } from '../../types/formValuesType'

//set className prop is optional, since TypeScript won't know that it's passed by the wrapper
//ref: https://styled-components.com/docs/api#typescript
type Props = {
  className?: string,
  bookmark: BookmarkType,
  editFunc: Function,
  deleteFunc: Function,
  setEditing: Function
}

//NOTE: className allows it to be wrapped in a styled component
const EditFormComponent = ({ className, bookmark, editFunc, deleteFunc, setEditing }: Props) => {

  const initState = {
    url: bookmark.url,
    urlDesc: bookmark.urlDesc,
    isWaiting: false,
    validationMessage: ''
  }

  //doesn't need the whole form values object, just need the Bookmark values, should be Bookmarkstype.
  const onSuccess = (values: BookmarkType, updateValues: Function) => {
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
const EditForm = styled(EditFormComponent)`
  border-bottom: 1px solid lightgrey;
  margin:4px 0 4px 0;
  padding: 0 0 4px 0;
`;

// export default EditItemForm;
export default EditForm;

