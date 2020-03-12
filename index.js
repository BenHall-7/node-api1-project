let express = require("express");
let shortid = require("shortid");
let server = express();

let users = [];

server.get("/", (_, res) => {
    res.send("Hello World!");
})

server.get("/api/users", (_req, res) => {
    try {
        res.status(201).json(users);
    } catch {
        res.status(500).json({ errorMessage: "The users information could not be retrieved." });
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
                res.status(500).json({ errorMessage: "There was an error while saving the user to the database" });
            }
        } else {
            res.status(400).json({ errorMessage: "'body' and/or 'bio' fields must be strings" });
        }
    } else {
        res.status(400).json({ errorMessage: "Please provide name and bio for the user." });
    }
})

server.listen(5000, () =>
  console.log('Server running on http://localhost:5000')
);