import React, { useContext } from "react";
import { FormProvider } from './FormProvider'
import FormInputFields from './FormInputFields'
import AddFormButtons from './AddFormButtons'

//NOTE: this compentent displays the form for adding a new item to the list.
// the inputs fields and the buttons are compenent defined in seperate files.
// the FormProvider component wraps both of these in a form tag and makes the data
// and function(s) avaliable to them with useContext.

function AddItemForm({ addFunc }: { addFunc: Function }) {

  const initState = {
    url: '',
    urlDesc: '',
    isWaiting: false,
    validationMessage: ''
  }

  //TODO: onSuccess
  const onSubmit = (values, updateValues) => {
    const newBookmark = {
      url: values.url,
      urlDesc: values.urlDesc,
      created: + new Date() 
    }
    addFunc(newBookmark)
    updateValues({ url: '', urlDesc: '' })
  }

  //TODO: onSuccess 
  return (
    <FormProvider initState={initState} onSubmit={onSubmit}>
      <FormInputFields />
      <AddFormButtons />
    </FormProvider>
  )

}

export default AddItemForm;