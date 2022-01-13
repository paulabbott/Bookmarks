import React from "react";
import { DisplayForm } from './DisplayForm'

//Could do it this way
/*
type Props = {
  addFunc: Function
}
*/

//TODO: I need to change this to a known pattern.
//TODO: use the button components as a half way step?
export interface formButtonDetails {
  type: string,
  value: string,
  func: Function,
  afterFunc: string
}

//ref: https://mariusschulz.com/blog/typing-destructured-object-parameters-in-typescript
function AddBookmark({ addFunc }: { addFunc: Function }) {

  const buttons: formButtonDetails[] = [{
    type: 'submit',
    value: 'add',
    func: addFunc,
    afterFunc: 'reset'
  }]

  return DisplayForm(buttons)
}

export default AddBookmark;