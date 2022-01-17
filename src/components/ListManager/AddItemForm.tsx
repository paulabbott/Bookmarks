import React from "react";
import { DisplayForm } from './DisplayForm'
import StyledButton from '../UI/StyledButton'
import FormInputFields from './FormInputFields'
import { FormAndData } from "./Types/FormAndData";

function AddBookmark({ addFunc }: { addFunc: Function }) {

  const AddFormButtons = ({ values, updateValues }: { values: FormAndData, updateValues: Function }) => {
    return (<StyledButton key='key-addButton' type='submit' wait={values.isWaiting} disabled={values.isWaiting}>
      {values.isWaiting ? 'wait' : 'add2'}
    </StyledButton>
    )
  }

  const onSubmit = (values: FormAndData, updateValues: Function) => {
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

  //So ideally <FormInputFields/> and <EditFormButtons/> would be children of <DisplayForm/>

  return <DisplayForm
    initState={initState}
    onSubmit={onSubmit}
    FormInputFields={FormInputFields}
    StyledButtons={AddFormButtons} />
}

export default AddBookmark;