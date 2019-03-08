import React, { Component, Fragment } from "react";
import { withStyles } from "@material-ui/core/styles";
import withWidth from "@material-ui/core/withWidth";
import classNames from "classnames";

import isTouchDevice from "is-touch-device";

import Drawer from "@material-ui/core/Drawer";
import Divider from "@material-ui/core/Divider";
import Toolbar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import Icon from "@material-ui/core/Icon";
import Hidden from "@material-ui/core/Hidden";

import Messages from "./components/Messages";
import UserList from "./components/UserList";
import ChatToolBar from "./components/ChatToolBar";

const drawerWidth = 250;

const styles = theme => ({
    root: {
        // display: "flex",
        // flexDirection: "column",
        // alignItems: "stretch",
        height: "100vh",
    },
    content: {
        // flexGrow: 1,
        minHeight: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
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
    },
    drawerPaper: {
        width: drawerWidth,
    },
    closeDrawerButton: {
        marginLeft: "auto",
    },
    appBar: {
        top: "auto",
        bottom: 0,
        zIndex: theme.zIndex.drawer + 1,
    },
    grow: {
        flexGrow: 1,
    },
    mainSpacer: {
        visibility: "hidden",
    },
    drawerSpacer: {
        visibility: "hidden",
        marginTop: -theme.spacing.unit * 3,
    },
    pageBottom: {
        display: "block",
        height: 0
    },
});

class Chatroom extends Component {
    inputArea = null;
    pageBottom = null;

    state = {
        draft: "",
        desktopDrawerOpen: true,
        mobileDrawerOpen: false,
    };

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
                                messagesEnd={this.pageBottom}
                            />
                        </main>
                    </div>
                    <AppBar position="static" className={classes.mainSpacer}>
                        <ChatToolBar
                            thisUserId={thisUserId}
                            users={users}
                            draft={draft}
                        />
                    </AppBar>
                    <Hidden only="xs">
                        <Drawer
                            anchor="right"
                            variant="persistent"
                            classes={{ paper: classes.drawerPaper }}
                            open={desktopDrawerOpen}
                        >
                            <UserList thisUserId={thisUserId} users={users} />
                            <AppBar position="static" className={classes.drawerSpacer}>
                                <ChatToolBar
                                    thisUserId={null}
                                    users={users}
                                    draft={draft}
                                />
                            </AppBar>
                        </Drawer>
                    </Hidden>
                    <Hidden smUp>
                        <Drawer
                            anchor="right"
                            variant="temporary"
                            classes={{ paper: classes.drawerPaper }}
                            open={mobileDrawerOpen}
                            onClose={this.closeDrawer}
                        >
                            <UserList thisUserId={thisUserId} users={users} />
                            <Divider/>
                            <Toolbar>
                                <IconButton
                                    onClick={this.closeDrawer}
                                    className={classes.closeDrawerButton}
                                >
                                    <Icon>close</Icon>
                                </IconButton>
                            </Toolbar>
                        </Drawer>
                    </Hidden>
                    <AppBar position="fixed" className={classes.appBar}>
                        <ChatToolBar
                            thisUserId={thisUserId}
                            users={users}
                            draft={draft}
                            submitMessage={this.submitMessage}
                            checkSubmit={this.checkSubmit}
                            writeDraft={this.writeDraft}
                            toggleDrawer={this.toggleDrawer}
                            inputRef={el => { this.inputArea = el; }}
                        />
                    </AppBar>
                    <a
                        id="messagesEnd"
                        ref={(el) => { this.pageBottom = el; }}
                        className={classes.pageBottom}
                    />
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

    checkSubmit = e => {
        if (e.which == 13 && !e.shiftKey && !isTouchDevice()) {
            this.submitMessage(e);
        }
    }

    submitMessage = e => {
        e.preventDefault();
        this.props.sendMessage(this.state.draft);
        this.setState({ draft: "" });
        this.inputArea.focus();
    };
}

export default withStyles(styles)(withWidth()(Chatroom));
