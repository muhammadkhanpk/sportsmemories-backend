import 'dotenv/config';
import express from 'express';

import './config/database';
import ApplyMiddlewares from './middlewares';
import router from './routes';
import { createSocketServer } from './socket-io';

const app = express();

ApplyMiddlewares(app);
const server = createSocketServer(app)

app.use('/api/v1', router);
app.get('/', (req, res) => {
  return res.json({
    message: 'Welcome To Sports Memories Club'
  })
})

server.listen(process.env.PORT, () => {
  console.log(`app is listening to port ${process.env.PORT}`);
});
