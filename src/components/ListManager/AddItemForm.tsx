import React from "react";
import { DisplayForm } from './DisplayForm'
import StyledButton from '../UI/StyledButton'
import validateField from "../../services/validateField";
import { NewDisplayForm } from "./NewDisplayForm";

function AddBookmark({ addFunc }: { addFunc: Function }) {

  const DisplayFormButtons = (values, updateValues) => {
    return (<StyledButton key='key-addButton' type='submit' wait={values.isWaiting} disabled={values.isWaiting}>
      {values.isWaiting ? 'wait' : 'add2'}
    </StyledButton>
    )
  }

  const onSubmit = (values, updateValues) => {
    //create a new bookmark and add it
    const newBookmark = {
      url: values.url,
      urlDesc: values.urlDesc,
      created: + new Date()
    }
    addFunc(newBookmark)
    updateValues({ url: '', urlDesc: '' })
  }

  const initState = {
    showForm: true,
    url: '',
    urlDesc: '',
    isWaiting: false,
    validationMessage: ''
  }

  return <div>DEBUG</div>

  // return <NewDisplayForm initState={initState} onSubmit={onSubmit} styledButtons={DisplayFormButtons} />
}

export default AddBookmark;