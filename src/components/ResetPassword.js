
import React, { Fragment, useEffect } from 'react'
import { useRouteMatch, useLocation, useHistory } from 'react-router-dom';
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
import { resetPassword } from '../configration/UserConfig'

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



function ResetPassword(props) {

    const match = useRouteMatch();
    const location = useLocation();
    const history = useHistory();
    const classes = useStyles();


    const [userLogin, setUserLogin] = React.useState({
        email: '',
        password: '',
        showPassword: false,
        token: match.params.token
    });

    const handleClickShowPassword = () => {
        setUserLogin({ ...userLogin, showPassword: !userLogin.showPassword });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    // useEffect(() => {
    //     setUserLogin({...userLogin,token:match.params.token})
    // }, [])


    const validateEmailAddress = e => {
        const regexp3 = /^^[a-zA-Z0-9]{1,}[._+-]?[a-zA-Z0-9]{1,}@[a-zA-Z0-9]{1,}([.][a-zA-Z]{2,3}){1,2}$/
        const char = e.target.value;
        if (!regexp3.test(char)) {
            setUserLogin({ ...userLogin, email: '' })
            document.getElementById("email").focus();
        }
    }

    const goToCreatePage = () => {
        history.push({
            pathname: "/signup"
        })
    }

    const resetPass = () => {
        resetPassword(userLogin).then(res => {
            console.log(res);
            props.openSnackBar(res.data)
            history.push({
                pathname: "/login",
            })
        }
        ).catch(err => {
            console.log(err.response.data.message);
            props.openSnackBar(err.response.data.message);
        })

    }

    return (

        <div className="loginDiv">
            <img className="logo" src={logo} alt="SuccessfullImage" />

            <Fragment>
                <p className="signInText">Sign in</p>
                <p className="googleAccount">Use your Google Account</p>
                <TextField
                    id="email"
                    label="Email"
                    style={{ width: "100%", marginBottom: "10px" }}
                    multiline
                    rowsMax={4}
                    value={userLogin.email}
                    onBlur={validateEmailAddress}
                    onChange={event => setUserLogin({ ...userLogin, email: event.target.value })}
                    variant="outlined"
                />
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

            </Fragment>

            <div className="nextButtonDiv">
                <p className="createAccountText" onClick={goToCreatePage}>Create account</p>
                <Button
                    className={classes.button}
                    variant="contained"
                    color="primary"
                    id="onSumbit"
                    onClick={resetPass}
                >Reset</Button>
            </div>
        </div>

    )
}

export default ResetPassword


