import React, { Component, Fragment } from "react";
import { withStyles } from "@material-ui/core/styles";

import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import Icon from "@material-ui/core/Icon";
import IconButton from "@material-ui/core/IconButton";
import Popover from "@material-ui/core/Popover";

const styles = theme => ({
    quote: {
        display: "inline-block",
        marginLeft: theme.spacing.unit * 4,
        padding: theme.spacing.unit,
        backgroundColor: theme.palette.grey[200],
        borderRadius: theme.shape.borderRadius,
    },
    key: {
        display: "inline-block",
        paddingLeft: "0.5ex",
        paddingRight: "0.5ex",
        backgroundColor: theme.palette.grey[200],
        borderRadius: theme.shape.borderRadius,
    },
    icon: {
        verticalAlign: "bottom",
    },
});

class HelpButton extends Component {
    state = { helpOpenEl: null };

    render() {
        const { classes } = this.props;
        const { helpOpenEl } = this.state;

        return (
            <Fragment>
                <IconButton
                    className={classes.helpButton}
                    color="inherit"
                    onClick={this.toggleHelp}
                >
                    <Icon>help_outline</Icon>
                </IconButton>
                <Popover
                    open={Boolean(helpOpenEl)}
                    onClose={this.closeHelp}
                    anchorEl={helpOpenEl}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                    transformOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                >
                    <DialogTitle>
                        Chatroom Help
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Your nickname is shown next to the message field.<br />
                            <br />
                            You can change it by sending a message like<br />
                            <span className={classes.quote}>/nick my-new-nickname</span><br />
                            <br />
                            You can change the color of your nickname by sending a message like<br />
                            <span className={classes.quote}>/nickcolor RRGGBB</span><br />
                            where "RRGGBB" is a hex color code.<br />
                            <br />
                            Click the <Icon className={classes.icon}>group</Icon> button to
                            show / hide the list of users. Online users have
                            a <Icon className={classes.icon}>check</Icon> beside their name
                            and offline users have a <Icon className={classes.icon}>close</Icon>.<br />
                            <br />
                            On desktop, hold <span className={classes.key}>Shift</span>+
                            <span className={classes.key}>Enter</span> to add a new line without sending.<br />
                        </DialogContentText>
                    </DialogContent>
                </Popover>
            </Fragment>
        );
    }

    toggleHelp = e => {
        this.setState({ helpOpenEl: e.currentTarget });
    }

    closeHelp = () => {
        this.setState({ helpOpenEl: null });
    }
}

export default withStyles(styles)(HelpButton);
