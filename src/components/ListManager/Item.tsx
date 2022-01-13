import React from 'react';
import styled from 'styled-components'
import { DisplayForm } from './DisplayForm'
import { Bookmark } from './ListManager';

//TODO: change bookmark to be Bookmark | null
type Props = {
  className: string,
  bookmark: Bookmark | object,
  editFunc: Function,
  deleteFunc: Function
}

//NOTE: className allows it to be wrapped in a styled component
const Item = ({ className, bookmark = {}, editFunc, deleteFunc }:Props) => {

  //TODO: why not pass in a list of <StyledButtons> ?
  const buttons = [
    {
      type: 'submit',
      value: 'update',
      func: editFunc,
      afterFunc: 'close'
    },
    {
      value: 'delete',
      func: deleteFunc
    },
    {
      value: 'cancel',
      afterFunc: 'close'
    }
  ]

  return (
    <div className={className}>
      {DisplayForm(buttons, bookmark)}
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

