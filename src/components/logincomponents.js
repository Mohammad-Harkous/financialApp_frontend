import styled from "styled-components";
import img from "../assets/back.svg"
import { keyframes } from 'styled-components';


export const StyledForm = styled.form`
  padding: 20px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
`;


export const StyledLabel = styled.label`
color:white;
  display: block;
  margin-bottom: 5px;
  margin-top:20px;
  font-weight: bold;
  color: ${(props) => (props.invalid ? "red" : "white")};
  @media (max-width: 768px) {
     
    margin-left:7%;
    margin-right:7%;
  }
`;

const goUp = keyframes`   
  0%{
    margin-top:30px;
    opacity:0.2;
  }

  50%{
    opacity:0.6;
  }
  100% {
    opacity:1;
  }
`

export const StyledInput = styled.input`
font-size:1.5em;
  max-width: 20em;
  height:3vh;
  padding: 10px;
  color:white;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color:transparent;
  style:none;
  outline:none;
  border: 2px white solid;
  @media (max-width: 768px) {
     
    margin-left:5%;
    margin-right:5%;
  }
`;

export const StyledButton = styled.button`
display:flex;
align-items:center;
justify-content:center;
font-weight:600;
height:5vh;
font-size:1.3rem;
  background-color: white;
  color: #2148C0;
  padding: 10px;
  margin-top: 25px;
  border: none;
  border-radius: 4px;
  
  &:disabled {
    opacity: 0.5;
    cursor:not-allowed;
  }
  &:enabled {
    opacity: 1;
    cursor: pointer;
  }
  opacity: ${(props) => (!props.enabled ? 0.5 : 1)};
  @media (max-width: 768px) {
    height:6vh ;
    margin-left:9%;
    margin-right:9%;
  }
`;

export const StyledAlert = styled.div`
  padding: 10px;
  background-color: #f44336;
  color: white;
  border-radius: 5px;
  animation: ${goUp} 0.3s ease;
  margin-top:10px;
`;

export const Body = styled.div`
  height: 100vh;
  width: 100vw;
  background-size: cover;
  background-image: url(${img});
  background-repeat:no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
 
`;

export const Logo=styled.img`
height:70px;
width:70px;
align-self:center;

`




