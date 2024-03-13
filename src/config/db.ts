import mongoose from 'mongoose';

require('dotenv').config();

const dbVar = process.env.MONGODB_URL || "mongodb://127.0.0.1:27017/DB";

mongoose.connect(dbVar).then(() => {
    if (dbVar.includes('mongodb://127.0.0.1:27017')) {
        return console.log("Local DB Connected !");
    }
    console.log('Live DB Connected');
}).catch((err) => {
    console.error(err);

    console.error('DB Connection Error:', err.message);
});
