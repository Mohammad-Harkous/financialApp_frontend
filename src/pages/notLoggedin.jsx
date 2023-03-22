import { NavLink } from "react-router-dom";
import React from "react";
import styled from "styled-components";

import {Body} from "../components/logincomponents.js";



let Text = styled.h1`
color: white;

`
let Big= styled.span`
font-size: 50px;
`
let Link= styled(NavLink)`
display: flex;
align-items: center;
justify-content: center;
font-size: 35px;
color: lightblue;
`
let Container=styled.div`
display: flex;
flex-direction: column;

`











export default  function NotLoggedin() {



return(
    <Body>
    <Container>
    <Text><Big>O</Big>Oops, Looks like someone's not Authorized !! </Text>
    <br/>
    <Link to="/">Back To Login</Link>
    </Container>
    </Body>

)



}