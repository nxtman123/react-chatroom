import React, { PureComponent, Fragment } from "react";
import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";

import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
    paper: {
        padding: theme.spacing.unit,
        marginBottom: theme.spacing.unit,
    },
    myMessage: {
        backgroundColor: theme.palette.grey[300],
    },
    nickname: {
        fontWeight: 700,
    }
});

class Messages extends PureComponent {
    messagesEnd = null;

    render() {
        const { classes, user, users, messages } = this.props;
        return (
            <Fragment>
                {messages.sort(
                    (a, b) => a.id > b.id
                ).map((message) =>
                    <Paper
                        key={message.id}
                        className={classNames(classes.paper, {
                            [classes.myMessage]: message.userId === user.id
                        })}
                    >
                        <Typography
                            className={classes.nickname}
                            style={{ color: users[message.userId].color }}
                            inline
                        >
                            {users[message.userId].nick}
                            {" "}
                        </Typography>
                        <Typography inline>
                            {message.text}
                        </Typography>
                    </Paper>
                )}
                <div ref={(el) => { this.messagesEnd = el; }} />
            </Fragment>
        );
    }

    componentDidMount() {
        this.messagesEnd.scrollIntoView();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.messages !== this.props.messages) {
            this.messagesEnd.scrollIntoView({ behavior: "smooth" });
        }
    }
}

export default withStyles(styles)(Messages);
