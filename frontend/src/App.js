import React, { Suspense } from "react";
import {Route, Switch } from 'react-router-dom';
import Header from "./components/Header/Header";
import Body from "./components/Body/Body";
import NavBar from "./components/NavBar/NavBar";
import LoginPage from "./components/LoginPage/LoginPage"
import RegisterPage from "./components/RegisterPage/RegisterPage"
import "./App.css";
import Auth from './hoc/auth';
import MyResumes from "./components/MyResumes/MyResumes";
import Test1 from "./components/TestComponents/Test1";

function App() {
  return (
      <Suspense fallback = {<div>Loading...</div>}>
        <NavBar/>
        {/* <div style={{ paddingTop: '10px', minHeight: 'calc(10vh)' }}></div> */}
        <Switch>
          <Route exact path="/" component={Auth(Header, null)} />
          <Route exact path="/body" render={(props) => (<Body {...props}/>)}/>
          <Route exact path="/myresume" component={Auth(MyResumes, true)}/>
          <Route exact path="/test1" component={Auth(Test1, true)}/>
          <Route exact path="/login" component={Auth(LoginPage, false)} />
          <Route exact path="/register" component={Auth(RegisterPage, false)} />
        </Switch>
      </Suspense>
  );
}

export default App;
