const express = require('express');
const http = require('http');
const route = require('./routes/index');

const app = express();
const server = http.createServer(app);

app.use(express.static('public'));
app.use(express.json({limit: "1mb"}));
app.use(route);

const port = process.env.PORT || 3000;

server.listen(port, () => console.log(`Listening to port ${port}`));