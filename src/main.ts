import express from 'express';
import { router } from './shared/routes/index.routes';
import cors from 'cors';
import 'reflect-metadata';
import 'dotenv/config';
import './shared/containers/index';

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());
app.use(router);
app.use(cors({ origin: '*' }));

app.get('/', (req, res) => res.send('Server is running...'));

app.listen(port, () => console.log(`Server is running at port :${port}`));
