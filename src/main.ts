import express from 'express';
import { router } from './shared/routes/index.routes';

const app = express();
const port = process.env.PORT || 8080;

app.use(router);

app.get('/', (req, res) => res.send('Server is running...'));

app.listen(port, () => console.log(`Server is running at port :${port}`));
