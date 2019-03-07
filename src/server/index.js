const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);

const uuidv4 = require("uuid/v4");
const animals = require("animals");
const randomColor = require("randomcolor");
const moment = require("moment");

const port = process.env.PORT || 8080;

const users = {};
const messages = [];

app.use(express.static("dist"));

io.on("connection", socket => {
    console.log("user " + socket.handshake.query.userId + " connected!");
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
    socket.emit("message history", messages);

    socket.on("message", msg => {
        console.log(userId + ": " + msg);

        if (msg.startsWith("/nick ")) {
            const newNick = msg.slice(6);
            if (Object.values(users).find(e => e.nick === newNick)) {
                socket.emit("nope", `The nickname ${newNick} is already in use.`);
            } else if (newNick.length > 20) {
                socket.emit("nope", `The nickname ${newNick} is too long.`);
            } else {
                users[userId] = {
                    ...users[userId],
                    nick: msg.slice(6),
                };
                io.emit("user list", users);
            }
        } else if (msg.startsWith("/nickcolor ")) {
            const newColor = msg.slice(11);
            if (/^[0-9A-Fa-f]{6}$/i.test(newColor)) {
                users[userId] = {
                    ...users[userId],
                    color: "#" + newColor,
                };
                io.emit("user list", users);
            } else {
                socket.emit("nope", "Use a hex color code in the form RRGGBB.");
            }
        } else {
            const newMessage = {
                id: messages.length,
                userId,
                time: moment().unix(),
                text: msg,
            };
            messages.push(newMessage);
            io.emit("message", newMessage);
        }
    });

    socket.on("disconnect", () => {
        users[userId] = {
            ...users[userId],
            online: false,
        };
        io.emit("user list", users);
        console.log("user " + userId + " disconnected :(");
    });
});

http.listen(port, "0.0.0.0", () => console.log(`Listening on port ${port}!`));
