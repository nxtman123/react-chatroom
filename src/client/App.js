import React, { Component } from "react";
import { MuiThemeProvider } from "@material-ui/core/styles";

import io from "socket.io-client"

import CssBaseline from "@material-ui/core/CssBaseline";
import LinearProgress from "@material-ui/core/LinearProgress";

import theme from "./theme";
import Chatroom from "./Chatroom";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            thisUserId: null,
            users: {},
            messages: [],
        };

        this.socket = io("http://localhost:8080/", {
            query: { userId: window.localStorage.getItem("userId") || null }
        });

        this.socket.on("identify", msg => {
            console.log("recieved user id: " + msg);
            window.localStorage.setItem("userId", msg);
            this.setState({ thisUserId: msg });
        });

        this.socket.on("user list", msg => {
            console.log("recieved user list");
            this.setState({ users: msg });
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
            </MuiThemeProvider>
        );
    }

    sendMessage = messageText => {
        const messages = this.state.messages;
        messages.push({
            id: messages.length,
            userId: this.state.thisUserId,
            text: messageText
        });
        this.setState({ messages });
    }
}

export default App;
