import React, { Fragment } from 'react'
import "../css/login.css";
import logo from "../asserts/google-logo.png";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import clsx from 'clsx';
import IconButton from '@material-ui/core/IconButton';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { login ,resetPassLink} from '../configration/UserConfig'
import {useHistory, useLocation} from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
    button: {
        margin: "0 1% 0 0",
        width: '20%',
        backgroundColor: "rgb(47,115,183)",
        "&:hover": {
            backgroundColor: "rgb(30,80,183)",
            color: "#FFF"
        },
    },
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    withoutLabel: {
        marginTop: theme.spacing(3),
    },
    textField: {
        width: '100%',
    },
}));



function Login(props) {

    const classes = useStyles();
    const history = useHistory();
    const location =useLocation(); 

    const [userLogin, setUserLogin] = React.useState({
        email: '',
        password: '',
        showPassword: false,
        emailPage: true
    });

    const handleClickShowPassword = () => {
        setUserLogin({ ...userLogin, showPassword: !userLogin.showPassword });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    
    const goToCreatePage = () => {
        if (location.pathname === "/login")
            history.push({
                pathname: "/signup",
            })
    }

    const nextPage = () => {
        if (userLogin.email !== '') {
            setUserLogin({ ...userLogin, emailPage: false })
        } else {
            document.getElementById("outlined-multiline-flexible").focus();
        }
    }

    const validateEmailAddress = e => {
        const regexp3 = /^^[a-zA-Z0-9]{1,}[._+-]?[a-zA-Z0-9]{1,}@[a-zA-Z0-9]{1,}([.][a-zA-Z]{2,3}){1,2}$/
        const char = e.target.value;
        if (!regexp3.test(char)) {
            setUserLogin({ ...userLogin, email: '' })
        }
    }

    const loginToFundoo = () => {
        login(userLogin).then(res =>
            props.openSnackBar(res.data.message)
        ).catch(err => {
            console.log(err.response.data.message);
            props.openSnackBar(err.response.data.message);
        })
    }

    const sendResetPass = () =>{
        if (userLogin.email !== '') {
            resetPassLink(userLogin.email).then(res =>
                {console.log(res.data)
                props.openSnackBar(res.data)}
            ).catch(err => {
                console.log(err.response.data.message);
                props.openSnackBar(err.response.data.message);
            })
        } else {
            document.getElementById("outlined-multiline-flexible").focus();
        }
    }

    return (

        <div className="loginDiv">
            <img className="logo" src={logo} alt="SuccessfullImage" />

            {(userLogin.emailPage === true) ? <Fragment>
                <p className="signInText">Sign in</p>
                <p className="googleAccount">Use your Google Account</p>
                <TextField
                    id="outlined-multiline-flexible"
                    label="Email"
                    style={{ width: "100%", marginBottom: "10px" }}
                    multiline
                    rowsMax={4}
                    value={userLogin.email}
                    onBlur={validateEmailAddress}
                    onChange={event => setUserLogin({ ...userLogin, email: event.target.value })}
                    variant="outlined"
                /> </Fragment> :
                <Fragment>
                    <p className="signInText">Welcome</p>
                    <div className="roundedDiv">
                        <AccountCircleIcon />
                        <p>{userLogin.email}</p>
                    </div>
                    <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type={userLogin.showPassword ? 'text' : 'password'}
                            value={userLogin.password}
                            style={{ width: "100%" }}
                            onChange={event => setUserLogin({ ...userLogin, password: event.target.value })}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {userLogin.showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            labelWidth={70}
                        />

                    </FormControl>

                </Fragment>}
            <p className="createAccountText" onClick={sendResetPass}>Forget password</p>
            <p className="createAccountText" style={{color:"black"}} >Not your computer? Use Guest mode to sign in privately. <span className="createAccountText"  >Learn more</span></p>
            


            <div className="nextButtonDiv">

                <p className="createAccountText" onClick={goToCreatePage}>Create account</p>
                {(userLogin.emailPage === true) ? <Button
                    className={classes.button}
                    variant="contained"
                    color="primary"
                    id="onSumbit"
                    onClick={nextPage}
                >Next</Button> :
                    <Button
                        className={classes.button}
                        variant="contained"
                        color="primary"
                        id="onSumbit"
                        onClick={loginToFundoo}
                    >Login</Button>}
            </div>
        </div>

    )
}

export default Login

