const express = require('express');
require('dotenv').config();


const cors = require('cors');



const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');

const app = express();

require('./db/conn');

const routes = require('./routes');

app.use(express.json());
app.use(cors());

app.use('/api/hr-management-user', routes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));



app.listen(5050, () => {
    console.log('Server started on port 5050');
});
