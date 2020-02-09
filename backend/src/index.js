const express = require('express');
const mongoose = require('mongoose')
const routes = require('./routes')
const connect = require('./Utils/ConnectionString')

const ConnectionString = connect.ConnectionString();
const app = express();
mongoose.connect(ConnectionString,{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(express.json());
app.use(routes);
app.listen(3333);