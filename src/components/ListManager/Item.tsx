import React from 'react';
import styled from 'styled-components'
import { DisplayForm } from './DisplayForm'
import { Bookmark } from './ListManager';
import StyledButton from '../UI/StyledButton'
import { NewDisplayForm } from './NewDisplayForm'
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
  const onSubmit = (values, updateValues) => {
    console.log('in Item onSubmit with', values, updateValues);
    console.log('bookmark=', bookmark);
    editFunc(bookmark)
    //updateValues({ showForm: false })
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

  //these were function params because that's how I was passing them from the render property of this
  //component, but now I want them to be props because that's how I'm passing them using cloneElement
  const DisplayFormButtons = ({ values, updateValues }) => {

    // console.log('in DisplayFormButtons with ', values, updateValues);
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


  //so last bit of the puzzel pass updateValues to the buttons object so it can reset form values?
  //sould maybe split form init state ie open/closed and data init state, ie bookmark.
  /*
<NewDisplayForm initState={initState} onSubmit={onSubmit} >
          <FormInputFields bookmark={bookmark} values updateValues>
          <DisplayFormButtons values updateValues/>
</NewDisplayForm>

  */


  // return (
  //   <div className={className}>
  //     <NewDisplayForm initState={initState} onSubmit={onSubmit} bookmark={bookmark} styledButtons={DisplayFormButtons} />
  //   </div>
  // )

  function WelcomeDialog() {
    return (
      <NewDisplayForm initState={initState} onSubmit={onSubmit} bookmark={bookmark}>
        <FormInputFields />
        <DisplayFormButtons />
      </NewDisplayForm>
    );
  }

  return <WelcomeDialog />  

}

//TODO: move to the components folder?
//TODO:Q is React.FC right here?
const StyledBookmark = styled(Item)`
  border-bottom: 1px solid lightgrey;
  margin:4px 0 4px 0;
  padding: 0 0 4px 0;
`;

export default StyledBookmark;

