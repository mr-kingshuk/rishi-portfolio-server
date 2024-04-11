import express from 'express';
import dotenv from "dotenv";
dotenv.config();
import mongoose from 'mongoose';
import morgan from 'morgan';
import cors from 'cors';

//routers imports
import userRouter from './routes/users.js';
import projectRouter from './routes/project.js';
import passwordRouter from './routes/password.js';
import generalRouter from './routes/general.js';

//enviroment variables and app
const app = express();
const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;

//middlewares
app.use(morgan('tiny'));
app.use(express.json());
app.use(cors({origin: "*"}));

//routes
app.use('/api/users/', userRouter);
app.use('/api/project/', projectRouter);
app.use('/api/password', passwordRouter);
app.use('/api/general', generalRouter);

app.get('/', (req, res) => {
    res.json({ 'msg': "hello world!!" });
});

//db connect
mongoose.connect(MONGO_URI)
    .then(() => {
        //listen for requests
        app.listen(PORT, () => {
            console.log(`Connected to DB & Server is running on port http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.log(err);
    });