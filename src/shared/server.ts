import express from 'express';
import { router } from './routes/index.routes';
import cors from 'cors';
import 'reflect-metadata';
import 'dotenv/config';
import './containers/index';

export const app = express();

app.use(express.json());
app.use(router);
app.use(cors({ origin: '*' }));

app.get('/', (req, res) => res.send('Server is running...'));
