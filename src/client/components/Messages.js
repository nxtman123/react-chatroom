import React, { Component, Fragment } from "react";
import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";

import moment from "moment";

import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
    paper: {
        padding: theme.spacing.unit,
        marginBottom: theme.spacing.unit,
    },
    myMessage: {
        backgroundColor: theme.palette.grey[200],
    },
    nickname: {
        fontWeight: 700,
        fontSize: "1.05rem",
    },
    time: {
        color: theme.palette.text.disabled,
    }
});

class Messages extends Component {
    messagesEnd = null;

    state = { messageCount: this.props.messages.length }

    render() {
        const { classes, thisUserId, users, messages } = this.props;
        return (
            <Fragment>
                {messages.sort(
                    (a, b) => a.id > b.id
                ).map((message) =>
                    <Paper
                        key={message.id}
                        className={classNames(classes.paper, {
                            [classes.myMessage]: message.userId === thisUserId
                        })}
                    >
                        <Typography
                            className={classes.nickname}
                            style={{ color: users[message.userId] ? users[message.userId].color : "black" }}
                            inline
                        >
                            {users[message.userId] ? users[message.userId].nick : "unknown user"}
                            {" "}
                        </Typography>
                        <Typography
                            className={classes.time}
                            variant="caption"
                            inline
                        >
                            {moment.unix(message.time).calendar()}
                        </Typography>
                        <Typography>
                            {message.text}
                        </Typography>
                    </Paper>
                )}
                <a id="messagesEnd" ref={(el) => { this.messagesEnd = el; }} />
            </Fragment>
        );
    }

    componentDidMount() {
        this.messagesEnd.scrollIntoView();
    }

    componentDidUpdate() {
        if (this.props.messages.length !== this.state.messageCount) {
            this.setState({ messageCount: this.props.messages.length });

            // we've got new messages, but should we scroll to the bottom?
            if ((
                    // yes, if we're close to the bottom
                    this.messagesEnd.getBoundingClientRect().bottom <
                    (window.innerHeight || document.documentElement.clientHeight) + 300
                ) || (
                    // yes, if it's my message
                    this.props.messages[this.props.messages.length-1].userId === this.props.thisUserId
                ) || (
                    // yes, if we're recieving more than one new message
                    // (e.g. joining existing chat, or reconnecting)
                    this.props.messages.length > this.state.messageCount + 1
                )
            ) {
                this.messagesEnd.scrollIntoView({ behavior: "smooth" });
            }
        }
    }
}

export default withStyles(styles)(Messages);
