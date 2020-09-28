import React, { useState } from 'react';
import './App.css';
import Login from './components/Login';
import CreateAccount from './components/CreateAccount';
import { BrowserRouter, Switch, Route ,Redirect} from 'react-router-dom'
import Styles from "./css/snackbar.module.css";
import Home from './components/Home';
import ResetPassword from './components/ResetPassword';


function App() {

  const [state, setState] = useState({ isActive: false, status: '' })
  const openSnackBar = (prop) => {
    setState({ status: prop, isActive: true })
    setTimeout(() => {
      setState({ status: '', isActive: false });
    }, 3000);
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          {/* <Route path={"/"} >
            <Redirect to={"/login"} component={Login} />
          </Route> */}
          <Redirect exact from="/" to="/login" />
          <Route path={"/login"} exact  >
            <Login openSnackBar={openSnackBar} />
          </Route>
          <Route path={"/signup"} exact component={CreateAccount} />
          <Route path={"/home"} exact component={Home} />
          {/* <Route path='/resetpassword/:token' component={ResetPassword} /> */}
          <Route path='/resetpassword/:token'  >
            <ResetPassword openSnackBar={openSnackBar} />
          </Route>
        </Switch>
      </BrowserRouter>
      <div
        className={
          state.isActive
            ? [Styles.snackbar, Styles.show].join(" ")
            : Styles.snackbar
        }
      >
        {state.status}
      </div>
    </div>
  );
}

export default App;
