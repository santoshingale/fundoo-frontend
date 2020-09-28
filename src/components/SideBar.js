import React, { useState, useEffect } from 'react';
import { makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import clsx from "clsx";
import { useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import EmojiObjectsOutlinedIcon from '@material-ui/icons/EmojiObjectsOutlined';
import NotificationsOutlinedIcon from '@material-ui/icons/NotificationsOutlined';
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';
import ArchiveOutlinedIcon from '@material-ui/icons/ArchiveOutlined';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';

const drawerWidth = 285;

const theme1 = createMuiTheme({
    overrides: {
        MuiDrawer: {
            paperAnchorLeft: {
                marginTop: "64px",
                background: "#202020"
            }
        },
        MuiListItem: {
            backgroundColor: 'none',
            selected: {
                backgroundColor: 'none',
                color: "red",},
            root: {
                "&$selected": { 
                    backgroundColor: "red",
                    color: "red",
                  },
            },
        }, 
        MuiButtonBase:{
            root: {
                "&$selected": { 
                    backgroundColor: "red",
                    color: "red",
                  },
            },
        }
    }
});

const useStyles = makeStyles(theme => ({

    drawer: {
        color: "#202020",
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: "nowrap",
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen
        })
    },
    drawerClose: {
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        }),
        overflowX: "hidden",
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up("sm")]: {
            width: theme.spacing(9) + 1
        }
    },
    toolbar: {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3)
    },
    List: {
        height: "60px",
        "&:hover": {
            borderRadius: " 0 30px 30px 0",
            backgroundColor: "rgb(65,50,25)"
        },
        "&:active": {
            backgroundColor: "turquoise !important",
            color: "red",
            fontWeight: 600,
            backgroundColor: "red"

          },
          selected: {
            '&&': {
            backgroundColor: 'blue',
            color: 'white'
            }}
          
        
    },

    ListItem: {

    }
}));

export default function PrimarySearchAppBar(props) {
    console.log(props.sideBar)
    const [open, setOpen] = useState(props.sideBar);
    const [button,setButton] = useState(props.sideBar);
    const [selected, setSelected] = useState(0);

    const classes = useStyles();
    const theme = useTheme();

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        setOpen(props.sideBar)
        setButton(props.sideBar)
    }, [props.sideBar])

    return (
        <div >

            <ThemeProvider theme={theme1}>
                <Drawer
                    mt="100px"
                    variant="permanent"
                    className={clsx(classes.drawer, {
                        [classes.drawerOpen]: open,
                        [classes.drawerClose]: !open
                    })}
                    onMouseOver={(button==false) ? handleDrawerOpen:null}
                    onMouseOut={(button==false) ?handleDrawerClose:null}
                    classes={{
                        paper: clsx({
                            [classes.drawerOpen]: open,
                            [classes.drawerClose]: !open
                        })
                    }}
                >
                    <List>
                        <ListItem button key="Note" className={classes.List} selected={selected === 0}>
                            <ListItemIcon>
                                <EmojiObjectsOutlinedIcon style={{ color: "white" }} />
                            </ListItemIcon>
                            <ListItemText primary="Note" style={{ color: "white" }} />
                        </ListItem>

                        <ListItem button key="Reminders" className={classes.List} selected={selected === 1}>
                            <ListItemIcon>
                                <NotificationsOutlinedIcon style={{ color: "white" }} />
                            </ListItemIcon>
                            <ListItemText primary="Reminders" style={{ color: "white" }} />
                        </ListItem>

                        <ListItem button key="Edit labels" className={classes.List} selected={selected === 2}>
                            <ListItemIcon>
                                <CreateOutlinedIcon style={{ color: "white" }} />
                            </ListItemIcon>
                            <ListItemText primary="Edit labels" style={{ color: "white" }} />
                        </ListItem>

                        <ListItem button key="Archive" className={classes.List} selected={selected === 3}>
                            <ListItemIcon>
                                <ArchiveOutlinedIcon style={{ color: "white" }} />
                            </ListItemIcon>
                            <ListItemText primary="Archive" style={{ color: "white" }} />
                        </ListItem>
                        <ListItem button key="Trash" className={classes.List} selected={selected === 4}>
                            <ListItemIcon>
                                <DeleteOutlinedIcon style={{ color: "white" }} />
                            </ListItemIcon>
                            <ListItemText primary="Trash" style={{ color: "white" }} />
                        </ListItem>

                    </List>
                </Drawer>
            </ThemeProvider>
        </div>
    );
}