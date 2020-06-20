const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes');
require('dotenv').config();

const connectionString = process.env.CONNECTIONSTRING;
const port = parseInt(process.env.PORT);
const app = express();
//const server = http.Server(app);

mongoose.connect(connectionString,{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(cors())
app.use(express.json());
app.use(routes);

app.listen(port);