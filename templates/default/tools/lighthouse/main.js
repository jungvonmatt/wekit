import { readFileSync } from 'fs';
import spdy from 'spdy';
import express, { static as staticMiddleware } from 'express';
import compression from 'compression';
import { fileURLToPath } from 'url';
import path from 'path';

const { createServer } = spdy;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const config = {
  src: '../../public',
  port: 3000,
  options: {
    key: readFileSync(__dirname + '/cert/localhost.key'),
    cert: readFileSync(__dirname + '/cert/localhost.cert'),
  },
};

const app = express();

app.use(compression(), staticMiddleware(config.src));

createServer(config.options, app).listen(config.port, () => {
  console.log('Your server is running on port https://localhost:' + config.port);
});
