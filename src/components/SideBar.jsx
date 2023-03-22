import styled from "styled-components";
import react from "react";
import { useNavigate, NavLink } from "react-router-dom";
import logo from "../assets/logo.svg";
import Dash from "../assets/dash.svg";
import Goal from "../assets/goal.svg";
import Report from "../assets/reports.svg";
import Trans from "../assets/trans.svg";
import Logout from "../assets/logout.svg";
import users from "../assets/user.svg"
const StyledContainer = styled.div`
  width: 300px;
  height: 100vh;
  background-color: #304daf;
  display: flex;
  position: absolute;
  flex-direction: column;
  justify-content: space-between;
`;
const StyledLogo = styled(NavLink)`
  margin: 0 auto;
  margin-top: 5%;
  border-bottom: 1.5px white solid;
  height: 8vh;
  width: 90%;
  font-weight: bold;
  style: none;
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30px;
  text-decoration: none;
  color: white;
`;
const ImgB = styled.img`
  height: 50px;
  width: 50px;
  padding-right: 10px;
`;

const ImgS = styled.img`
  height: 30px;
  width: 30px;
  margin-left: 10%;
  margin-right: 15%;
  color: red;
`;
const StyledLink = styled(NavLink)`
  margin: 0 auto;
  margin-top: 3%;
  height: 8vh;
  width: 90%;

  font-weight: bold;
  style: none;
  outline: none;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  border-radius: 2%;
  font-size: 20px;
  text-decoration: none;
  color: white;
  &:hover {
    background-color: #4887e0;
  }
  &:after {
    content: "";
    position: absolute;
    width: 0%;
    height: 1px;
    margin-top: 25.2%;

    transition: all 0.3s ease-out;
  }
  &:hover::after {
    width: 90%;
    height: 2.5px;
    background-color: #fff;
  }
  &:focus {
    background-color: #1465d9;
  }
`;
const Footer = styled.div`
  margin: 0 auto;
  margin-bottom: 7%;
  width: 90%;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const EmptyDiv = styled.div``;
const StyledLink2 = styled(NavLink)`
${props => props.$style ?? {}}
  margin: 0 auto;
  margin-top: 3%;
  height: 8vh;
  width: 90%;

  font-weight: bold;
  style: none;
  outline: none;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  border-radius: 2%;
  font-size: 20px;
  text-decoration: none;
  color: white;
  &:hover {
    background-color: #4887e0;
  }
`
function sideBar() {
  let user = sessionStorage.getItem("name");
 ;
  function logout() {
    sessionStorage.clear();
  }

  let role = sessionStorage.getItem("role");
  return (
    <>
      <StyledContainer>
        <EmptyDiv>
          <StyledLogo to="/dashboard">
            <ImgB src={logo} />
            FinStat
          </StyledLogo>
          <StyledLink to="/dashboard">
            <ImgS src={Dash} />
            Dashboard
          </StyledLink>
         
          <StyledLink to="/recurring">
          <ImgS src={Trans} />
          Recurring Transactions
        </StyledLink>
          <StyledLink to="/reports">
            <ImgS src={Report} />
            Reports
          </StyledLink>
          <StyledLink to="/transactions">
          <ImgS src={Trans} />
          Transactions
        </StyledLink>
          <StyledLink to="/goals">
            <ImgS src={Goal} />
            Goals
          </StyledLink>
        </EmptyDiv>
        <Footer>
          {role === "1" ? 
          <StyledLink2 to="/users" $style={{ borderBottom: '1.5px solid white' }}>
          <ImgS src={users}/>
          Users
          </StyledLink2> : ""}
          <StyledLink2 to="/" onClick={logout}>
            <ImgS src={Logout} />
            {user}
          </StyledLink2>
        </Footer>
      </StyledContainer>
    </>
  );
}

export default sideBar;
