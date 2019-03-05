import React, { Component, Fragment } from "react";
import { withStyles } from "@material-ui/core/styles";

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
import withWidth from "@material-ui/core/withWidth";

import UserList from "./components/UserList";

const drawerWidth = 250;

const styles = theme => ({
    drawerPaper: {
        width: drawerWidth,
        overflow: "hidden"
    },
    drawerToolbar: {
        justifyContent: "end"
    },
    appBar: {
        top: "auto",
        bottom: 0,
        zIndex: theme.zIndex.drawer + 1
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
        fontWeight: 700
    },
    messageField: {
        padding: theme.spacing.unit
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
            },
            // {
            //     id: "8c4ff54d-783d-4e95-b6bf-06bffb6069ae",
            //     nick: "nathan",
            //     color: "#de248c"
            // }, {
            //     id: "ce37ee70-3f0b-466b-acec-9bf6f6efefef",
            //     nick: "aidan",
            //     color: "#1234d6"
            // }, {
            //     id: "1f717bcc-fa96-4b80-aaf9-71370dab12a5",
            //     nick: "connor",
            //     color: "#269415"
            // }, {
            //     id: "8c4ff54d-783d-4e95-b6bf-06bffb6069b4",
            //     nick: "mick",
            //     color: "#de248c"
            // }, {
            //     id: "ce37ee70-3f0b-466b-acec-9bf6f6efefc8",
            //     nick: "leo",
            //     color: "#1234d6"
            // }, {
            //     id: "1f717bcc-fa96-4b80-aaf9-7a370dab1295",
            //     nick: "marissa",
            //     color: "#269415"
            // }, {
            //     id: "8c4ff54d-783d-4e95-b6bf-0bbffb6069a4",
            //     nick: "heidi",
            //     color: "#de248c"
            // }, {
            //     id: "ce37ee70-3f0b-466b-acec-9cf6f6efefe8",
            //     nick: "kali",
            //     color: "#1234d6"
            // },
        ],
        drawerOpen: (this.props.width === "xs" ? false : true)
    };

    componentDidMount() {
        fetch('/api/getUsername')
            .then(res => res.json())
            .then(user => this.setState({ username: user.username }));
    }

    render() {
        const { classes, width } = this.props;
        const { user, users, drawerOpen } = this.state;
        return (
            <Fragment>
                <CssBaseline />
                Messages
                <Drawer
                    anchor="right"
                    variant={width === "xs" ? "temporary" : "persistent"}
                    classes={{ paper: classes.drawerPaper }}
                    open={drawerOpen}
                >
                    <UserList user={user} users={users} />
                    <Divider/>
                    <Toolbar className={classes.drawerToolbar}>
                        <IconButton onClick={this.closeDrawer}>
                            <Icon>close</Icon>
                        </IconButton>
                    </Toolbar>
                </Drawer>
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
            </Fragment>
        );
    }

    toggleDrawer = () => {
        this.setState({
            drawerOpen: !this.state.drawerOpen
        });
    }

    closeDrawer = () => {
        this.setState({
            drawerOpen: false
        });
    }
}

export default withStyles(styles)(withWidth()(Chatroom));
