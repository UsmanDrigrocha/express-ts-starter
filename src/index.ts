

import { join } from 'path';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();

app.use(cors({origin:true}));
app.use(express.static('default'));
app.use(cors());

app.use(express.json())
app.use(express.urlencoded({ extended: true, limit: '5mb' }));
app.use(bodyParser.json())

app.use('/', express.static(join(__dirname, '..', 'public/uploads')));

require('./config/db');

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});

app.get('/', (req, res) => {
    res.send('Hello World!');
});
