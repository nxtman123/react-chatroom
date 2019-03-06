const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);

const uuidv4 = require('uuid/v4');
const animals = require("animals");
const randomColor = require('randomcolor');

const port = process.env.PORT || 8080;

const users = {};
const messages = [];

app.use(express.static("dist"));

io.on("connection", socket => {
    console.log("a user, " + socket.handshake.query.userId + ", connected!");
    let userId = socket.handshake.query.userId;

    if (userId === null || Object.keys(users).indexOf(userId) === -1) {
        userId = uuidv4();
        users[userId] = {
            nick: animals(),
            color: randomColor({ luminosity: "bright" }),
            online: true,
        };
    } else {
        users[userId] = {
            ...users[userId],
            online: true,
        };
    }
    io.emit("user list", users);     // send the updated user list before...
    socket.emit("identify", userId); // sending the user's id

    socket.on("disconnect", () => {
        users[userId] = {
            ...users[userId],
            online: false,
        };
        console.log("user, " + userId + ", disconnected :(");
    });
});

http.listen(port, () => console.log(`Listening on port ${port}!`));
