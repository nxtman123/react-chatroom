import React, { Component } from "react";
import { MuiThemeProvider } from "@material-ui/core/styles";

import io from "socket.io-client"

import CssBaseline from "@material-ui/core/CssBaseline";
import LinearProgress from "@material-ui/core/LinearProgress";
import Snackbar from "@material-ui/core/Snackbar";
import Fade from "@material-ui/core/Fade";

import theme from "./theme";
import Chatroom from "./Chatroom";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            thisUserId: null,
            users: {},
            messages: [],
            snackOpen: false,
            snackText: "",
        };

        const socketPath = process.env.NODE_ENV === "production" ? "" : ":8080";

        this.socket = io(socketPath, {
            query: { userId: window.localStorage.getItem("userId") || null }
        });

        this.socket.on("identify", newId => {
            const oldId = window.localStorage.getItem("userId") || null
            window.localStorage.setItem("userId", newId);
            if (oldId !== newId) {
                this.setState({
                    thisUserId: newId,
                    snackOpen: true,
                    snackText: `Your nickname is ${this.state.users[newId].nick}`,
                });
            } else {
                this.setState({ thisUserId: newId });
            }
        });

        this.socket.on("user list", msg => {
            this.setState({ users: msg });
        });

        this.socket.on("message history", msg => {
            this.setState({ messages: msg });
        });

        this.socket.on("message", msg => {
            const messages = this.state.messages;
            messages.push(msg);
            this.setState({ messages });
        });

        this.socket.on("nope", msg => {
            this.setState({
                snackOpen: true,
                snackText: msg,
            });
        });
    }

    render() {
        return (
            <MuiThemeProvider theme={theme}>
                <CssBaseline />
                {this.state.thisUserId ? (
                    <Chatroom {...this.state} sendMessage={this.sendMessage} />
                ) : (
                    <LinearProgress/>
                )}
                <Snackbar
                    open={this.state.snackOpen}
                    onClose={this.closeSnack}
                    autoHideDuration={3000}
                    TransitionComponent={Fade}
                    anchorOrigin={{ vertical: "top", horizontal: "center"}}
                    message={this.state.snackText}
                />
            </MuiThemeProvider>
        );
    }

    sendMessage = messageText => {
        this.socket.emit("message", messageText);
    }

    closeSnack = () => {
        this.setState({ snackOpen: false });
    }
}

export default App;
