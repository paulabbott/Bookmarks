import styled from 'styled-components'

type Props = {
  wait?: boolean
}

const StyledButton = styled.button<Props>`
  border-radius: 10px;
  border: 0;
  background-color: ${props => props.wait ? "pink" : "lightgrey"};  
  padding: 2px 8px;
  margin:0 4px 0 0;
  // text-transform: uppercase;
  color:white;
    &:hover {
    background-color: ${props => props.wait ? "pink" : "lightblue"}; 
    text-decoration: ${props => props.wait ? "line-through" : "none"};     
  }
`

export default StyledButton