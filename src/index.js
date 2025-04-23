const express = require('express');
const itemRoutes = require("./routes/items.js");

const app = express();

// Middlewares
app.use(express.json());
app.use('/items', itemRoutes);


// Default route
app.get("/", (request, response) => {
    response.send("Hello from Inventory!");
});

app.get("/health", (request, response) => {
    response.json({
        status: "OK"
    });
});

module.exports = app;