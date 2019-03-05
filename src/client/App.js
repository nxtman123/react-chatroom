import React, { Component } from "react";
import { MuiThemeProvider } from "@material-ui/core/styles";

import theme from "./theme";
import Chatroom from "./Chatroom";

class App extends Component {
    render() {
        return (
            <MuiThemeProvider theme={theme}>
                <Chatroom />
            </MuiThemeProvider>
        );
    }
}

export default App;
