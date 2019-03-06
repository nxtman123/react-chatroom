import React, { Component } from "react";
import { MuiThemeProvider } from "@material-ui/core/styles";

import theme from "./theme";
import Chatroom from "./Chatroom";

class App extends Component {
    state = {
        thisUserId: "1f717bcc-fa96-4b80-aaf9-71370dab1295",
        users: {
            "1f717bcc-fa96-4b80-aaf9-71370dab1295": {
                nick: "kurtis",
                color: "#269415"
            },
            "8c4ff54d-783d-4e95-b6bf-06bffb6069a4": {
                nick: "mark",
                color: "#de248c"
            },
            "ce37ee70-3f0b-466b-acec-9bf6f6efefe8": {
                nick: "amanda",
                color: "#1234d6"
            },
            "1f717bcc-fa96-4b80-aaf9-71370dab129a": {
                nick: "zack",
                color: "#269415"
            },
            "8c4ff54d-783d-4e95-b6bf-06bffb6069ab": {
                nick: "tom",
                color: "#de248c"
            },
            "ce37ee70-3f0b-466b-acec-9bf6f6efefec": {
                nick: "jack",
                color: "#1234d6"
            },
            "1f717bcc-fa96-4b80-aaf9-71370dab129d": {
                nick: "lauren",
                color: "#269415"
            },
            "8c4ff54d-783d-4e95-b6bf-06bffb6069ae": {
                nick: "nathan",
                color: "#de248c"
            },
            "ce37ee70-3f0b-466b-acec-9bf6f6efefef": {
                nick: "aidan",
                color: "#1234d6"
            }
        },
        messages: [
            {
                id: 0,
                userId: "ce37ee70-3f0b-466b-acec-9bf6f6efefec",
                time: 1551855109,
                text: "bla bla bla bla bla bla"
            }, {
                id: 1,
                userId: "ce37ee70-3f0b-466b-acec-9bf6f6efefec",
                time: 1551855209,
                text: "you there kurtis?"
            }, {
                id: 2,
                userId: "1f717bcc-fa96-4b80-aaf9-71370dab1295",
                time: 1551856209,
                text: "yeah I'm here"
            }, {
                id: 3,
                userId: "8c4ff54d-783d-4e95-b6bf-06bffb6069ab",
                time: 1551856409,
                text: "*cries softly*"
            }, {
                id: 4,
                userId: "ce37ee70-3f0b-466b-acec-9bf6f6efefec",
                time: 1551856509,
                text: "checking in"
            }, {
                id: 5,
                userId: "1f717bcc-fa96-4b80-aaf9-71370dab129d",
                time: 1551856510,
                text: "what's up?"
            }, {
                id: 6,
                userId: "8c4ff54d-783d-4e95-b6bf-06bffb6069ae",
                time: 1551856511,
                text: "Hey, everyone"
            }, {
                id: 7,
                userId: "ce37ee70-3f0b-466b-acec-9bf6f6efefef",
                time: 1551856512,
                text: "bahahaha!"
            }
        ],
    };

    render() {
        return (
            <MuiThemeProvider theme={theme}>
                <Chatroom {...this.state} sendMessage={this.sendMessage} />
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
