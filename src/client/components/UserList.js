import React, { Component, Fragment } from "react";
import { withStyles } from "@material-ui/core/styles";

import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListSubheader from "@material-ui/core/ListSubheader";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import Icon from "@material-ui/core/Icon";
import IconButton from "@material-ui/core/IconButton";

const styles = theme => ({
    nickname: {
        fontWeight: 700,
        fontSize: "1.05rem",
    },
    list: {
        flexGrow: 1,
        flexShrink: 1,
        overflow: "auto",
    },
    item: {
        paddingTop: theme.spacing.unit,
        paddingBottom: 0,
    }
});

const UserList = (props) => (
    <Fragment>
        <ListSubheader>Users</ListSubheader>
        <Divider/>
        <List className={props.classes.list}>
            {Object.keys(props.users).map((userId) => (
                <ListItem key={userId} className={props.classes.item}>
                    <Icon>{props.users[userId].online ? "check" : "close"}</Icon>
                    <ListItemText disableTypography>
                        <Typography
                            className={props.classes.nickname}
                            style={{ color: props.users[userId].color }}
                        >
                            {props.users[userId].nick}
                            {userId === props.thisUserId ? (
                                <Typography variant="caption" inline>
                                    {" (me)"}
                                </Typography>
                            ) : null}
                        </Typography>
                    </ListItemText>
                </ListItem>
            ))}
        </List>
    </Fragment>
);

export default withStyles(styles)(UserList);
