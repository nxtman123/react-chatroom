import React, { Fragment } from "react";
import { withStyles } from "@material-ui/core/styles";

import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import Tooltip from "@material-ui/core/Tooltip";
import Icon from "@material-ui/core/Icon";
import IconButton from "@material-ui/core/IconButton";

const styles = theme => ({
    helpButton: {
        marginLeft: "auto"
    },
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
    },
    me: {
        color: theme.palette.text.disabled,
    }
});

const UserList = (props) => {
    const { classes, thisUserId, users } = props;

    return (
        <Fragment>
            <ListItem>
                <ListItemText>
                    Users
                </ListItemText>
            </ListItem>
            <Divider/>
            <List className={classes.list}>
                {Object.keys(users).sort(
                    (a, b) => (users[a].nick > users[b].nick)
                ).map((userId) => (
                    <ListItem key={userId} className={classes.item}>
                        <Tooltip
                            placement="right"
                            title={users[userId].online ? "online" : "offline"}
                        >
                            <Icon>{users[userId].online ? "check" : "close"}</Icon>
                        </Tooltip>
                        <ListItemText disableTypography>
                            <Typography
                                className={classes.nickname}
                                style={{ color: users[userId].color }}
                            >
                                {users[userId].nick}
                                {userId === thisUserId ? (
                                    <Typography
                                        className={classes.me}
                                        variant="caption"
                                        inline
                                    >
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
}

export default withStyles(styles)(UserList);
