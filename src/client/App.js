import React, { Component, Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';

import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';

const styles = theme => ({
    appBar: {
        top: 'auto',
        bottom: 0,
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
        fontWeight: 500
    },
    messageField: {
        padding: theme.spacing.unit
    }
});

class App extends Component {
    state = { username: null };

    componentDidMount() {
        fetch('/api/getUsername')
            .then(res => res.json())
            .then(user => this.setState({ username: user.username }));
    }

    render(props) {
        const { classes } = this.props;
        const { username } = this.state;
        return (
            <Fragment>
                <CssBaseline />
                {username ? `Hello ${username}` : "Loading... please wait!"}
                <AppBar position="fixed" className={classes.appBar}>
                    <Toolbar className={classes.toolbar}>
                        <Paper className={classes.inputArea}>
                            <Typography
                                variant="subtitle1"
                                className={classes.nickname}
                            >
                                {username}
                            </Typography>
                            <InputBase
                                className={classes.messageField}
                                fullWidth
                                placeholder="Write a message..."
                            />
                            <Button color="primary">send</Button>
                        </Paper>
                        <IconButton color="inherit">
                            <Icon>group</Icon>
                        </IconButton>
                    </Toolbar>
                </AppBar>
            </Fragment>
        );
    }
}

export default withStyles(styles, { withTheme: true })(App);
