import React, { Component } from "react";
import { MuiThemeProvider } from "@material-ui/core/styles";

import theme from "./theme";
import Chatroom from "./Chatroom";

class App extends Component {
    state = {
        user: {
            id: "1f717bcc-fa96-4b80-aaf9-71370dab1295",
            nick: "kurtis",
            color: "#269415"
        },
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
                text: "bla bla bla bla bla bla"
            }, {
                id: 1,
                userId: "ce37ee70-3f0b-466b-acec-9bf6f6efefec",
                text: "you there kurtis?"
            }, {
                id: 2,
                userId: "1f717bcc-fa96-4b80-aaf9-71370dab1295",
                text: "yeah I'm here"
            }, {
                id: 3,
                userId: "8c4ff54d-783d-4e95-b6bf-06bffb6069ab",
                text: "*cries softly*"
            }, {
                id: 4,
                userId: "ce37ee70-3f0b-466b-acec-9bf6f6efefec",
                text: "checking in"
            }, {
                id: 5,
                userId: "1f717bcc-fa96-4b80-aaf9-71370dab129d",
                text: "what's up?"
            }, {
                id: 6,
                userId: "8c4ff54d-783d-4e95-b6bf-06bffb6069ae",
                text: "Hey, everyone"
            }, {
                id: 7,
                userId: "ce37ee70-3f0b-466b-acec-9bf6f6efefef",
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
        console.log("adding message " + messageText);
        const messages = this.state.messages;
        messages.push({
            id: messages.length,
            userId: this.state.user.id,
            text: messageText
        });
        console.log(messages);
        this.setState({ messages });
    }
}

export default App;
