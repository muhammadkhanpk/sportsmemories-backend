import 'dotenv/config';
import express from 'express';

import './config/database';
import ApplyMiddlewares from './middlewares';
import router from './routes';

const app = express();

ApplyMiddlewares(app);

app.use('/api/v1', router);
app.get('/', (req, res) => {
  return res.json({
    message: 'Welcome To Sports Memories Club'
  })
})

app.listen(process.env.PORT, () => {
  console.log(`app is listening to port ${process.env.PORT}`);
});
