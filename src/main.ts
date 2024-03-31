import { app } from './shared/server';

const port = process.env.PORT || 8080;

app.listen(port, () => console.log(`Server is running at port :${port}`));
