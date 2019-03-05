import React, { Component, Fragment } from "react";
import { withStyles } from "@material-ui/core/styles";

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
        verticalAlign: "baseline"
    },
    list: {
        flexGrow: 1,
        flexShrink: 1,
        overflow: "auto",
    }
});

const UserList = (props) => (
    <Fragment>
        <ListSubheader>Online</ListSubheader>
        <List className={props.classes.list}>
            {props.users.map((user) => (
                <ListItem key={user.id}>
                    <ListItemText disableTypography>
                        <Typography
                            className={props.classes.nickname}
                            style={{ color: user.color }}
                        >
                            {user.nick}
                            {user.id === props.user.id ? (
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
