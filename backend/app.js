const express = require('express');

const md5 = require('md5');
const path = require('path');
const multer = require('multer');

const cors = require('cors');
require('dotenv').config();


const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');

const app = express();

require('./db/conn');

const routes = require('./routes');

app.use(express.json());
app.use(cors());

app.use('/api', routes);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.post('/api/v1/uploading', async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    const storage = multer.diskStorage({

        destination: function (req, file, cb) {
            cb(null, './uploads/')
        },
        filename: function (req, file, callback) {
            callback(null, md5(Date.now()) + path.extname(file.originalname));
        }
    });

    const uploaFile = multer({
        storage: storage,
    }).single('image');

    uploaFile(req, res, async (err) => {

        if (!req.file) {
            res.status(500).send({
                sucecess: false,
                data: [],
                message: "Select File"
            });

        } else if (err) {
            res.status(500).send({
                sucecess: false,
                data: [],
                message: "not upload"
            });

        } else {

            res.status(200).send({
                sucecess: true,
                data: { filepath_url: req.file.filename, url: process.env.MAIN_URL + "uploads/" + req.file.filename },
                message: "",
            });

        }
    });
})


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
