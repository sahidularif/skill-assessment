const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const cors = require('cors');
const port = 4000 || process.env.PORT
const {routes } = require('./routes/routes');
// const { productRoute } = require('./routes/services');
require('dotenv').config();
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
require('./database')()


app.use('/api', routes);

app.get("/", (req, res) => {
    res.json({ message: "Welcome" })
});


// Server Liseting 
const server = app.listen(port, () => {
    console.log('Connected to port ' + port)
})


app.use((err, req, res, next) => {
    if (res.headersSent) {
        next()
    } else {
        if(err.message){
            res.status(500).send(err.message)
        } else {
            res.send('There was an error')
        }
    }
})