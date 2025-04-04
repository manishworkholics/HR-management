require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express()


const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');



require('./db/conn')


const routes = require('./routes');

app.use(express.json());
app.use(cors());

app.use('/api', routes);



app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


app.listen(4000, () => {
    console.log('server is start')
})