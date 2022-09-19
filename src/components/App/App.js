import React, { useEffect, useState } from "react";
import styled from "styled-components";
import HomePage from "../../pages/HomePage";
import LoginPage from "../../pages/LoginPage";
import NewPostPage from "../../pages/NewPostPage";
import Header from "../Header";
import ArticlePage from "../../pages/ArticlePage";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { AuthContext } from "../../context";
import { getMe } from "../../WebAPI";

const Root = styled.div`
  padding-top: 64px;
`;

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    getMe().then((res) => {
      if (res.ok) {
        console.log(res);
        setUser(res.data);
      }
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <Root>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />}></Route>
            <Route path="/post/:userId" element={<ArticlePage />}></Route>
            <Route path="/new-post" element={<NewPostPage />}></Route>
            <Route path="/login" element={<LoginPage />}></Route>
          </Routes>
        </Router>
      </Root>
    </AuthContext.Provider>
  );
}

export default App;
