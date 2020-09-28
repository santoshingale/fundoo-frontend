import React, { useState } from 'react'
import "../css/createAccount.css";
import logo from "../asserts/google-logo.png";
import signUpSideImg from "../asserts/account.svg";
import { makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { addUser } from "../configration/UserConfig";


const useStyles = makeStyles((theme) => ({

    input: {
        height: 50
    },

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
        marginTop: theme.spacing(100),
    },
    textField: {
        width: '40%',
        height: 20,
        marginBottom: '40px',
        marginRight: '5%',
    },
    IconButton: {
        width: '40px',
        height: '40px',
        margin: 0,
        paddingBottom: "50px",
        textAlign: 'center',
    },
    // labelRoot: {
    //     top:0,
    //     marginTop:0,
    //     // fontSize: 12,
    //     color: "red",
    //     "&$labelFocused": {
    //       color: "purple"
    //     }
    //   },
    //   labelFocused: {}
}));

const initializeState = {
    fName: '',
    lName: '',
    username: '',
    password: '',
    showPassword: false
}

function CreateAccount(props) {
    const classes = useStyles();

    const [signUpData, setSignUpData] = useState(initializeState)

    const handleClickShowPassword = () => {
        setSignUpData({ ...signUpData, showPassword: !signUpData.showPassword });
    };

    const updateState = event => {
        setSignUpData({ ...signUpData, [event.target.name]: event.target.value });
    };

    const submitState = async () => {
        await addUser(signUpData)
        await setSignUpData(initializeState)
    }

    return (
        <div className="signUpDiv">
            <div className="c60Div">
                <img className="logo" src={logo} alt="SuccessfullImage" />
                <p className="signInText">Sign in</p>
                <div className="signUpFieldDiv">
                    <TextField
                        name="fName"
                        label="First name"
                        className={classes.textField}
                        InputProps={{
                            className: classes.input
                        }}
                        InputLabelProps={{
                            classes: {
                              root: classes.labelRoot,
                              focused: classes.labelFocused
                            }
                          }}
                        onChange={updateState}
                        value={signUpData.fName}
                        variant="outlined"
                    />
                    <TextField
                        label="Last name"
                        name="lName"
                        InputProps={{
                            className: classes.input
                        }}
                        onChange={updateState}
                        className={classes.textField}
                        value={signUpData.lName}
                        variant="outlined"
                    />
                </div>
                <TextField
                    label="Username"
                    name="username"
                    InputProps={{
                        className: classes.input
                    }}
                    onChange={updateState}
                    className={classes.textField}
                    style={{ width: "85%" }}
                    // style={{ width: "100%", marginBottom: "10px" }}

                    value={signUpData.username}
                    // onBlur={validateEmailAddress}
                    variant="outlined"
                />

                <div className="signUpFieldDiv">
                    <TextField
                        label="Password"
                        name="password"
                        InputProps={{
                            className: classes.input
                        }}
                        onChange={updateState}
                        className={classes.textField}
                        style={{ width: "45%" }}
                        type={signUpData.showPassword ? 'text' : 'password'}
                        value={signUpData.password}
                        variant="outlined"
                    />
                    <TextField
                        label="Password"
                        name="password"
                        InputProps={{
                            className: classes.input
                        }}
                        onChange={updateState}
                        className={classes.textField}
                        style={{ width: "45%" }}
                        type={signUpData.showPassword ? 'text' : 'password'}
                        value={signUpData.password}
                        variant="outlined"
                    />
                    <IconButton

                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        edge="end"
                        className={classes.IconButton}
                    >
                        {signUpData.showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                </div>
                <Button
                    className={classes.button}
                    variant="contained"
                    color="primary"
                    onClick={submitState}
                >Login</Button>

            </div>
            <div><img className="signUpSideImg" src={signUpSideImg} alt="SuccessfullImage" />
                <p style={{ fontSize: "15px", marginBlockStart: "0" }}>One account. All of Google<br /> working for you.</p></div>

        </div>
    )
}

export default CreateAccount
