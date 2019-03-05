import React, { Component, Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';

import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    grow: { flexGrow: 1 }
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
                <AppBar><Toolbar>
                    <Typography variant="h6" color="inherit" className={classes.grow}>
                        Chatroom
                    </Typography>
                    <IconButton color="inherit">
                        <Icon>menu</Icon>
                    </IconButton>
                </Toolbar></AppBar>
                {username ? `Hello ${username}` : <h1>Loading.. please wait!</h1>}
            </Fragment>
        );
    }
}

export default withStyles(styles, { withTheme: true })(App);
