import React from "react";
import styled from "styled-components";
import logo from "../assets/logo.svg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  StyledForm,
  StyledInput,
  StyledButton,
  StyledAlert,
  StyledLabel,
  Body,
  Logo,
} from "../components/logincomponents.js";

function LoginForm() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [invalidCreds, setinvalidCreds] = React.useState(false);
  const [enabled, setEnabled] = React.useState(false);
  const navigate = useNavigate();
  async function loginUser(event) {
    event.preventDefault();
    const x = await fetch("http://127.0.0.1:8000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    // validate password and set passwordInvalid state accordingly

    const response = await x.json();
    sessionStorage.setItem("user_id", response.id);
    sessionStorage.setItem("name", response.name);
    sessionStorage.setItem("token", response.token);
    sessionStorage.setItem("role", response.role);
    console.log("response", response);
    if (response.token) {
      navigate("/dashboard", { replace: true });
    }
    if (response.message) {
      setinvalidCreds(true);
    }
  }

  const usernameEntered = (e) => {
    setEmail(e.target.value);
    // buttonEnabled(username, password)
  };

  const passwordEntered = (e) => {
    setPassword(e.target.value);
    // buttonEnabled(username, password)
  };

  const buttonEnabled = (email, password) => {
    if (email.length > 0 && password.length > 0) {
      setEnabled(true);
    } else {
      setEnabled(false);
    }
  };

  return (
    <Body>
      <StyledForm onSubmit={loginUser}>
        <Logo src={logo} alt="company logo"></Logo>

        <StyledLabel>Email</StyledLabel>
        <StyledInput
          type="email"
          value={email}
          onChange={(e) => usernameEntered(e)}
        />
        <StyledLabel >Password</StyledLabel>
        <StyledInput
          type="password"
          value={password}
          onChange={(e) => passwordEntered(e)}
        />
       
        {invalidCreds && (
          <StyledAlert>incorrect email or password.</StyledAlert>
        )}
        <StyledButton type="submit" disabled={!email || !password}>
          LOGIN
        </StyledButton>
      </StyledForm>
    </Body>
  );
}

export default LoginForm;
