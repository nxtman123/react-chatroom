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

        if (msg.startsWith("/")) { // check for commands
            const command = msg.slice(1, msg.indexOf(" ") === -1 ? undefined : msg.indexOf(" ")).toLowerCase();
            const args = msg.slice(2 + command.length);
            console.log("command: /" + command + " " + args);

            if (command === "nick") { // change nickname
                const newNick = args;
                if (newNick.length > 20) {
                    socket.emit("nope", `The nickname ${newNick} is too long.`);
                } else {
                    for (let id of Object.keys(users)) {
                        if (id === userId) {
                            // I'm allowed to change capitalization on my own nickname
                            continue;
                        } else
                        // compare nicknames case-insensitively to avoid confusion
                        if (users[id].nick.toLowerCase() === newNick.toLowerCase()) {
                            socket.emit("nope", `The nickname ${users[id].nick} is already in use.`);
                            return;
                        }
                    }
                    users[userId] = {
                        ...users[userId],
                        nick: newNick,
                    };
                    io.emit("user list", users);
                }
            } else if (command === "nickcolor") { // change nickname color
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
                socket.emit("nope", `Unknown command /${command}.`);
            }

        } else { // not a command, send the regular message
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
