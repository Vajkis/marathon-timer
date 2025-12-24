import express from 'express';
import cors from 'cors';
import routes from './routes';
import path from 'path';
import fs from 'fs';
import { connectToStreamlabs } from './connectToStreamlabs';
import { startTimer } from './timer';
import { config } from './config';

const app = express();
const port = 3000;

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', routes);

app.use(express.static(path.join(__dirname, '../public')));

app.use((req, res) => {
  res.redirect('/');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);

  connectToStreamlabs();

  fs.readFile(
    path.join(__dirname, '../data/rawTime.txt'),
    'utf8',
    (error, data) => {
      if (error) {
        console.error('Error reading file:', error);
        return;
      }
      const rawTime = Number(data);
      startTimer(rawTime || config.timerInit);
    }
  );
});
