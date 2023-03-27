import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import subjectRoutes from './routes_container/subjectRoutes';
import { authenticateUser } from './function_container/subjectFunctions';

const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/login', authenticateUser);
app.use('/subject', subjectRoutes);

app.listen(3000, () => {
  console.log(`Server is running on port 3000`);
});
