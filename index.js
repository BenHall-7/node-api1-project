let express = require("express");
let cors = require("cors");
let shortid = require("shortid");
let server = express();

let users = [];

server.use(express.json());
server.use(cors());

server.get("/", (_, res) => {
    res.send("Hello World!");
});

server.get("/api/users", (_req, res) => {
    try {
        res.status(201).json(users);
    } catch {
        res.status(500).json({ message: "The users information could not be retrieved." });
    }
});

server.post("/api/users", ({body}, res) => {
    if (body.name && body.bio) {
        if (typeof body.name === "string" && typeof body.bio === "string") {
            try {
                const user = {
                    id: shortid.generate(),
                    name: body.name,
                    bio: body.bio,
                };
                users.push(user);
                res.status(200).json(user);
            } catch {
                res.status(500).json({ message: "There was an error while saving the user to the database" });
            }
        } else {
            res.status(400).json({ message: "'body' and/or 'bio' fields must be strings" });
        }
    } else {
        res.status(400).json({ message: "Please provide name and bio for the user." });
    }
});

server.delete("/api/users/:id", (req, res) => {
    try {
        let index = users.findIndex(u => u.id === req.params.id);
        if (index >= 0) {
            users.splice(index, 1);
            res.sendStatus(200);
        } else {
            res.status(404).json({ message: "The user with the specified ID does not exist." });
        }
    } catch {
        res.status(500).json({ message: "The user could not be removed" });
    }
});

server.put("/api/users/:id", (req, res) => {
    try {
        let user = users.find(u => u.id === req.params.id);
        if (user) {
            if (body.name && body.bio) {
                if (typeof body.name === "string" && typeof body.bio === "string") {
                    user.name = body.name;
                    user.bio = body.bio;
                    res.status(200).json(user);
                } else {
                    res.status(400).json({ message: "'body' and/or 'bio' fields must be strings" });
                }
            } else {
                res.status(400).json({ message: "Please provide name and bio for the user." });
            }
        } else {
            res.status(404).json({ message: "The user with the specified ID does not exist." });
        }
    } catch {
        res.status(500).json({ message: "The user could not be removed" });
    }
});

server.listen(5000, () =>
  console.log('Server running on http://localhost:5000')
);