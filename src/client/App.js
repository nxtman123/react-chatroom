import React, { Component } from "react";
import { MuiThemeProvider } from "@material-ui/core/styles";

import io from "socket.io-client"

import CssBaseline from "@material-ui/core/CssBaseline";
import LinearProgress from "@material-ui/core/LinearProgress";

import theme from "./theme";
import Chatroom from "./Chatroom";
import AlertBar from "./components/AlertBar";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            thisUserId: null,
            users: {},
            messages: [],
            alertMessage: null,
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
                    alertMessage: ["Your nickname is ", this.state.users[newId].nick, "."],
                });
            } else {
                this.setState({ thisUserId: newId });
            }
        });

        this.socket.on("user list", users => {
            this.setState({ users });
        });

        this.socket.on("message history", messages => {
            this.setState({ messages });
        });

        this.socket.on("message", msg => {
            const messages = this.state.messages;
            messages.push(msg);
            this.setState({ messages });
        });

        this.socket.on("nope", nopeMsg => {
            this.setState({
                alertMessage: nopeMsg,
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
                <AlertBar
                    alertMessage={this.state.alertMessage}
                    closeAlert={this.closeAlert}
                />
            </MuiThemeProvider>
        );
    }

    sendMessage = messageText => {
        this.socket.emit("message", messageText);
    }

    closeAlert = () => {
        this.setState({ alertMessage: null });
    }
}

export default App;
