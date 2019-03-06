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
import Hidden from "@material-ui/core/Hidden";

import Messages from "./components/Messages";
import UserList from "./components/UserList";

const drawerWidth = 250;

const styles = theme => ({
    root: {
        display: "flex",
    },
    content: {
        height: "100vh",
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
        paddingTop: theme.spacing.unit * 2,
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
        flex: "0 1 auto",
        fontWeight: 700,
        fontSize: "1.05rem",
    },
    messageField: {
        flex: "1 2 7em",
        padding: theme.spacing.unit,
    },
    form: {
        display: "contents"
    },
    grow: {
        flexGrow: 1,
    }
});

class Chatroom extends Component {
    state = {
        draft: "",
        desktopDrawerOpen: true,
        mobileDrawerOpen: false,
    };

    componentDidMount() {
        fetch('/api/getUsername')
            .then(res => res.json())
            .then(user => this.setState({ username: user.username }));
    }

    render() {
        const { classes, width, thisUserId, users, messages } = this.props;
        const { draft, desktopDrawerOpen, mobileDrawerOpen } = this.state;
        return (
            <Fragment>
                <div className={classes.root}>
                    <div
                        className={classNames(classes.content, {
                            [classes.contentShift]: (desktopDrawerOpen && width !== "xs"),
                        })}
                    >
                        <div className={classes.grow} />
                        <main className={classes.mainArea}>
                            <Messages
                                thisUserId={thisUserId}
                                users={users}
                                messages={messages}
                            />
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
                            <UserList thisUserId={thisUserId} users={users} />
                            <Toolbar className={classes.drawerToolbar} />
                        </Drawer>
                    </Hidden>
                    <Hidden smUp>
                        <Drawer
                            anchor="right"
                            variant="temporary"
                            classes={{ paper: classes.drawerPaper }}
                            open={mobileDrawerOpen}
                        >
                            <UserList thisUserId={thisUserId} users={users} />
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
                                    style={{ color: users[thisUserId] ? users[thisUserId].color : "black" }}
                                >
                                    {users[thisUserId] ? users[thisUserId].nick : "me"}
                                </Typography>
                                <form
                                    onSubmit={this.submitMessage}
                                    className={classes.form}
                                >
                                    <InputBase
                                        className={classes.messageField}
                                        fullWidth
                                        placeholder="Write a message..."
                                        value={draft}
                                        onChange={this.writeDraft}
                                    />
                                    <Button
                                        color="primary"
                                        disabled={draft === ""}
                                        type="submit"
                                    >
                                        send
                                    </Button>
                                </form>
                            </Paper>
                            <IconButton
                                color="inherit"
                                onClick={this.toggleDrawer}
                            >
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

    writeDraft = e => {
        this.setState({
            draft: e.target.value
        });
    }

    submitMessage = e => {
        e.preventDefault();
        this.props.sendMessage(this.state.draft);
        this.setState({ draft: "" });
    };
}

export default withStyles(styles)(withWidth()(Chatroom));
