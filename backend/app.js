require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express()



require('./db/conn')


const routes = require('./routes');

app.use(express.json());
app.use(cors());

app.use('/api', routes);






app.listen(4000, () => {
    console.log('server is start')
})