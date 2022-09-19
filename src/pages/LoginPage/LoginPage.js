import React from "react";
import styled from "styled-components";
import { useState, useContext } from "react";
import { login, getMe } from "../../WebAPI";
import { setAuthToken, getAuthToken } from "../../utils";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context";

const ErrorMessage = styled.div`
  color: red;
`;
//載入時 getLocalStorage > 發 token request > server?

export default function LoginPage() {
  const { user, setUser } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // login get token, setLocalStorage(token)
    login(username, password).then((data) => {
      if (data.ok !== 1) {
        return setErrorMessage(data.message);
      }
      setAuthToken(data.token);
      getMe().then((res) => {
        if (res.ok !== 1) {
          setAuthToken(null);
          return setErrorMessage(res.message);
        }
        setUser(res.data);
        console.log("login success");
        console.log(res.data);
        navigate("/");
      });
    });

    setUsername("");
    setPassword("");
  };
  const handleFocus = () => {
    setErrorMessage(null);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        username:{" "}
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onFocus={handleFocus}
        />
      </div>
      <div>
        password:{" "}
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
        />
      </div>
      <button>登入</button>
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </form>
  );
}
