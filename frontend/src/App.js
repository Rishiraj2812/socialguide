import React from 'react';
import './App.css';
import Header from './component/Header/Header';
import {
  BrowserRouter as Router, Switch,Route, Redirect, } from "react-router-dom";
import Homepage from "./component/Homepage";
import Auth from "./component/Auth";
import Aquestion from './component/AddQuestion/Aquestion';
import ViewQuestion from './component/ViewQuestion';
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectUser } from "./features/userSlice";
import { useEffect } from "react";
import { auth } from "./firebase";


function App() {
    
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(
          login({
            uid: authUser.uid,
            photo: authUser.photoURL,
            displayName: authUser.displayName,
            email: authUser.email,
          })
        );
      } else {
        dispatch(logout());
      }
      console.log(authUser);
    });
  }, [dispatch]);

  const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={(props) =>
        user ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/auth",
              state: {
                from: props.location,
              },
            }}
          />
        )
      }
    />
  );

  return (
    <div className="App">
     <Router>
      <Header/>
      <Switch>
        <Route exact path={user ? '/' : '/auth'} component={user ?Homepage:Auth} />
        <PrivateRoute exact path='/add-question' component={Aquestion}/>
        <PrivateRoute exact path='/' component={Homepage}/>
        <PrivateRoute exact path='/question' component={ViewQuestion}/>
      </Switch>
     </Router>
    </div>
  );
}

export default App;
