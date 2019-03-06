import React, { Component, Fragment } from "react";
import { withStyles } from "@material-ui/core/styles";
import withWidth from "@material-ui/core/withWidth";
import classNames from "classnames";

import Drawer from "@material-ui/core/Drawer";
import Divider from "@material-ui/core/Divider";
import Toolbar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Icon from "@material-ui/core/Icon";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import Typography from "@material-ui/core/Typography";
import CssBaseline from "@material-ui/core/CssBaseline";
import Hidden from "@material-ui/core/Hidden";

import UserList from "./components/UserList";

const drawerWidth = 250;

const styles = theme => ({
    root: {
        display: "flex",
    },
    content: {
        flexGrow: 1,
        transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginRight: 0,
        display: "flex",
        flexDirection: "column",
    },
    contentShift: {
        transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginRight: drawerWidth,
    },
    mainArea: {
        flexGrow: 1,
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
        paddingLeft: theme.spacing.unit * 3,
        paddingRight: theme.spacing.unit * 3,
        overflowY: "auto",
    },
    drawerPaper: {
        width: drawerWidth,
        overflow: "hidden",
    },
    drawerToolbar: {
        justifyContent: "end",
    },
    appBar: {
        top: "auto",
        bottom: 0,
        zIndex: theme.zIndex.drawer + 1,
    },
    toolbar: {
        paddingRight: theme.spacing.unit * 2,
    },
    inputArea: {
        flexGrow: 1,
        display: "flex",
        alignItems: "baseline",
        marginRight: theme.spacing.unit * 2,
        paddingLeft: theme.spacing.unit * 2,
        paddingRight: theme.spacing.unit,
    },
    nickname: {
        fontWeight: 700,
    },
    messageField: {
        padding: theme.spacing.unit,
    }
});

class Chatroom extends Component {
    state = {
        user: {
            id: "1f717bcc-fa96-4b80-aaf9-71370dab1295",
            nick: "kurtis",
            color: "#269415"
        },
        users: [
            {
                id: "1f717bcc-fa96-4b80-aaf9-71370dab1295",
                nick: "kurtis",
                color: "#269415"
            }, {
                id: "8c4ff54d-783d-4e95-b6bf-06bffb6069a4",
                nick: "mark",
                color: "#de248c"
            }, {
                id: "ce37ee70-3f0b-466b-acec-9bf6f6efefe8",
                nick: "amanda",
                color: "#1234d6"
            }, {
                id: "1f717bcc-fa96-4b80-aaf9-71370dab129a",
                nick: "zack",
                color: "#269415"
            }, {
                id: "8c4ff54d-783d-4e95-b6bf-06bffb6069ab",
                nick: "tom",
                color: "#de248c"
            }, {
                id: "ce37ee70-3f0b-466b-acec-9bf6f6efefec",
                nick: "jack",
                color: "#1234d6"
            }, {
                id: "1f717bcc-fa96-4b80-aaf9-71370dab129d",
                nick: "lauren",
                color: "#269415"
            }, {
                id: "8c4ff54d-783d-4e95-b6bf-06bffb6069ae",
                nick: "nathan",
                color: "#de248c"
            }, {
                id: "ce37ee70-3f0b-466b-acec-9bf6f6efefef",
                nick: "aidan",
                color: "#1234d6"
            }
        ],
        messages: [
            {
                id: 0,
                userId: "ce37ee70-3f0b-466b-acec-9bf6f6efefec",
                text: "bla bla bla bla bla bla"
            }, {
                id: 1,
                userId: "ce37ee70-3f0b-466b-acec-9bf6f6efefec",
                text: "you there kurtis?"
            }, {
                id: 2,
                userId: "1f717bcc-fa96-4b80-aaf9-71370dab1295",
                text: "yeah I'm here"
            }, {
                id: 3,
                userId: "8c4ff54d-783d-4e95-b6bf-06bffb6069ab",
                text: "me too"
            }, {
                id: 4,
                userId: "ce37ee70-3f0b-466b-acec-9bf6f6efefec",
                text: "checking in"
            }, {
                id: 5,
                userId: "1f717bcc-fa96-4b80-aaf9-71370dab129d",
                text: "what's up?"
            }, {
                id: 6,
                userId: "8c4ff54d-783d-4e95-b6bf-06bffb6069ae",
                text: "Hey, everyone"
            }, {
                id: 7,
                userId: "ce37ee70-3f0b-466b-acec-9bf6f6efefef",
                text: "bahahaha!"
            }
        ],
        desktopDrawerOpen: true,
        mobileDrawerOpen: false,
    };

    componentDidMount() {
        fetch('/api/getUsername')
            .then(res => res.json())
            .then(user => this.setState({ username: user.username }));
    }

    render() {
        const { classes, width } = this.props;
        const { user, users, desktopDrawerOpen, mobileDrawerOpen } = this.state;
        return (
            <Fragment>
                <CssBaseline />
                <div className={classes.root}>
                    <div
                        className={classNames(classes.content, {
                            [classes.contentShift]: (desktopDrawerOpen && width !== "xs"),
                        })}
                    >
                        <main className={classes.mainArea}>
                            Messages
                        </main>
                        <Toolbar/>
                    </div>
                    <Hidden only="xs">
                        <Drawer
                            anchor="right"
                            variant="persistent"
                            classes={{ paper: classes.drawerPaper }}
                            open={desktopDrawerOpen}
                        >
                            <UserList user={user} users={users} />
                            <Divider/>
                            <Toolbar className={classes.drawerToolbar}>
                                <IconButton onClick={this.closeDrawer}>
                                    <Icon>close</Icon>
                                </IconButton>
                            </Toolbar>
                        </Drawer>
                    </Hidden>
                    <Hidden smUp>
                        <Drawer
                            anchor="right"
                            variant="temporary"
                            classes={{ paper: classes.drawerPaper }}
                            open={mobileDrawerOpen}
                        >
                            <UserList user={user} users={users} />
                            <Divider/>
                            <Toolbar className={classes.drawerToolbar}>
                                <IconButton onClick={this.closeDrawer}>
                                    <Icon>close</Icon>
                                </IconButton>
                            </Toolbar>
                        </Drawer>
                    </Hidden>
                    <AppBar position="fixed" className={classes.appBar}>
                        <Toolbar className={classes.toolbar}>
                            <Paper className={classes.inputArea}>
                                <Typography
                                    variant="body1"
                                    className={classes.nickname}
                                    style={{ color: user.color }}
                                >
                                    {user.nick}
                                </Typography>
                                <InputBase
                                    className={classes.messageField}
                                    fullWidth
                                    placeholder="Write a message..."
                                />
                                <Button color="primary">send</Button>
                            </Paper>
                            <IconButton color="inherit" onClick={this.toggleDrawer}>
                                <Icon>group</Icon>
                            </IconButton>
                        </Toolbar>
                    </AppBar>
                </div>
            </Fragment>
        );
    }

    toggleDrawer = () => {
        if (this.props.width === "xs") {
            this.setState({
                mobileDrawerOpen: !this.state.mobileDrawerOpen,
            });
        } else {
            this.setState({
                desktopDrawerOpen: !this.state.desktopDrawerOpen,
            });
        }
    }

    closeDrawer = () => {
        if (this.props.width === "xs") {
            this.setState({
                mobileDrawerOpen: false,
            });
        } else {
            this.setState({
                desktopDrawerOpen: false,
            });
        }
    }
}

export default withStyles(styles)(withWidth()(Chatroom));
