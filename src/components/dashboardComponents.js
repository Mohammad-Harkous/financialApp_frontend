import styled from "styled-components";

import { NavLink } from "react-router-dom";

export const Section=styled.div`
display: flex;
flex-direction: row;
`
export const Body = styled.div`
 font-family: Tahoma, Verdana, sans-serif;
  background-color: #f8f9fd;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
`;
export const CardContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
align-self: flex-start;
  width: 55vw;
  margin-top: 1%;
  margin-left: 300px;
`;

export const Card = styled.div`
  height: 16vh;
  width: 240px;
  background-color: red;
  border-radius: 6%;
  font-size: 35px;
  display: flex;
  align-items: center;
  flex-direction: column;
  color: white;
  box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
`;

export const CardTitle = styled.h3`
  margin-left: 7%;
  margin-top: 7%;
  color: white;
  font-size: 20px;
  align-self: flex-start;
`;

export const TransContainer = styled.div`
background-color: white;
  margin-top: 1%;
  width: 30em;
  height: 925px;
  border-radius: 4%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
`;
export const TransHeader = styled.div`
  border-bottom: 1px gray solid;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  color: black;
  font-size: 23px;
  margin-left: 5%;
  margin-right: 5%;
  margin-top: 3%;
  margin-bottom: 3%;
  width: 90%;
`;
export const Link = styled(NavLink)`
  color: #6d7d93;
  font-size: 14px;
  font-weight: 700;
  display: flex;
  align-items: center;
  text-decoration: none;
`;

export const Arrow = styled.img`
  height: 12px;
  width: 18px;
  margin-top: 3%;
  margin-left: 5px;
`;

export const TransCard=styled.div`
background: radial-gradient(592px at 48.2% 50%, rgba(255, 255, 249, 0.6) 10%, rgb(66,121,212) 465%);
align-self: center;
width: 85%;
height: 14%;
align-items: center;
justify-content: space-between;
display: flex;
border-radius: 3%;
margin-bottom: 4%;

box-shadow: rgba(67, 71, 85, 0.27) 0px 0px 0.25em, rgba(90, 125, 188, 0.05) 0px 0.25em 1em;


`

export const TransTitle=styled.h3`
margin-left: 4%;
color: black;
`
export const TransPrice=styled.h4`
margin-right: 4%;

`

export const ChartContainer=styled.div`
margin-left: 20%;
background-color: white;
margin-top: -38%;
border-radius: 1%;
box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
`

export const GoalCotainer = styled.div`

margin-left: 20%;
margin-top: 2%;
width: 885px;
height: 280px;
border-radius: 1em;
display: flex;
align-items: center;
/* background: radial-gradient(circle at 10% 20%, rgb(48,77,175) 0%, rgb(39, 170, 255) 90%); */
background-color:rgb(48,77,175);
justify-content: space-between;
box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;

`
export const Goal=styled.div`
display: flex;
flex-direction: column;
height: 280px;
width: 600px;
align-items: flex-start;
`

export const GoalTitle=styled.h1`
color:white;
margin-left: 40%;
margin-top: 8%;
display: flex;
font-family: "Times New Roman", Times, serif;



`

export const Datecon=styled.div`
display: flex;
justify-content: space-between;
width: 250px;
margin-left: 33%;
`
export const Dates=styled.h3`
color: #cfcfcf;
margin-left: 4%;
margin-top: -4%;

`



export const Resultcontainer=styled.div`

margin-left: 22%;
width: 400px;
margin-bottom: 3%;
height:40px;
display: flex;
justify-content: space-between;

`
export const Resultlabel=styled.div`
font-size: 22px;
color: white;
display: flex;
display: flex;
justify-content: flex-start;


`
export const Wrapper=styled.div`
display: flex;
align-items: center;
width: 200px;
justify-content: flex-start;



`

export const Result=styled.div`
display: flex;
color: #FEB019;
font-weight: bold;
font-size: 22px;


`





