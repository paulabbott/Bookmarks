import React, { useContext } from "react";
import { FormProvider } from './FormProvider'
import FormInputs from './FormInputs'
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

  //TODO: try and move to file.
  type valuesType = {
    url: string,
    urlDesc: string
  }

  //NOTE: values and updateValues are passed in by the formProvider. What type should they be?
  //TODO: object should be more specific
  const onSuccess = (values: valuesType, updateValues: Function) => {
    const newBookmark = {
      url: values.url,
      urlDesc: values.urlDesc,
      created: + new Date()
    }
    addFunc(newBookmark)
    updateValues({ url: '', urlDesc: '' })
  }

  return (
    <FormProvider initState={initState} onSuccess={onSuccess}>
      <FormInputs />
      <AddFormButtons />
    </FormProvider>
  )

}

export default AddItemForm;