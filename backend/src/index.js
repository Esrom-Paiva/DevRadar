const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes');

const ConnectionString = 'mongodb+srv://devpaiva:devpaiva@cluster0-nhwlp.mongodb.net/week10?retryWrites=true&w=majority';
const app = express();
//const server = http.Server(app);

mongoose.connect(ConnectionString,{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(cors())
app.use(express.json());
app.use(routes);

app.listen(3333);