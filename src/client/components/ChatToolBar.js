import React from "react";
import { withStyles } from "@material-ui/core/styles";

import Paper from "@material-ui/core/Paper";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Icon from "@material-ui/core/Icon";
import InputBase from "@material-ui/core/InputBase";

import HelpButton from "./HelpButton";

const styles = theme => ({
    toolbar: {
        paddingLeft: theme.spacing.unit,
        paddingRight: theme.spacing.unit,
    },
    inputArea: {
        flexGrow: 1,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "stretch",
        flexWrap: "nowrap",
        margin: theme.spacing.unit,
    },
    wrapGroup: {
        flexGrow: 1,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "stretch",
        flexWrap: "wrap",
    },
    nickname: {
        alignSelf: "center",
        marginTop: theme.spacing.unit,
        marginBottom: theme.spacing.unit,
        paddingLeft: theme.spacing.unit * 2,
        flex: "0 1 auto",
        fontWeight: 700,
        fontSize: "1.05rem",
    },
    messageField: {
        flex: "1 1 10em",
        paddingLeft: theme.spacing.unit * 2,
        paddingRight: theme.spacing.unit,
        lineHeight: 1.5,
    },
    form: {
        display: "contents"
    },
    sendButton: {
        marginTop: theme.spacing.unit,
        marginBottom: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
});

const ChatToolBar = (props) => {
    const {
        classes, thisUserId, users, draft, submitMessage, checkSubmit,
        writeDraft, inputRef, toggleDrawer
    } = props;
    return (
        <Toolbar className={classes.toolbar}>
            <HelpButton />
            <Paper className={classes.inputArea} elevation={0}>
                <form
                    onSubmit={submitMessage}
                    className={classes.form}
                >
                    <div className={classes.wrapGroup}>
                        <Typography
                            variant="body1"
                            className={classes.nickname}
                            style={{ color: users[thisUserId] ? users[thisUserId].color : "black" }}
                        >
                            {users[thisUserId] ? users[thisUserId].nick : "me"}
                        </Typography>
                        <InputBase
                            className={classes.messageField}
                            fullWidth
                            autoFocus
                            multiline
                            rowsMax={6}
                            onKeyPress={checkSubmit}
                            placeholder="Write a message..."
                            value={draft}
                            onChange={writeDraft}
                            inputRef={inputRef}
                        />
                    </div>
                    <Button
                        className={classes.sendButton}
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
                onClick={toggleDrawer}
            >
                <Icon>group</Icon>
            </IconButton>
        </Toolbar>
    )
};

export default withStyles(styles)(ChatToolBar);
