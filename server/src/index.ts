import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import { userRouter } from './routes/user.route';
import { groupRouter } from './routes/group.route';
import { groupUserRouter } from './routes/groupUser.route';

dotenv.config({
    path: '../.env',
});

//############## APP ##################

const app: Express = express();
const PORT = process.env.PORT;

//################ UTILITIES #############

app.use(
    cors({
        origin: process.env.CORS_ORIGIN,
        credentials: true,
    })
);

app.use(express.json({ limit: '16kb' }));

app.use(express.urlencoded({ extended: true, limit: '16kb' }));

app.use(express.static('public'));

app.use(cookieParser());

//############## ROUTES #####################

app.use('/weeble/api/user', userRouter);
app.use('/weeble/api/group', groupRouter);
app.use('/weeble/api/groupUser', groupUserRouter);

app.get('/', (req: Request, res: Response) => {
    res.send('WORKING');
});

app.listen(PORT, () => {
    console.log('App is listening on port: ', PORT);
});
