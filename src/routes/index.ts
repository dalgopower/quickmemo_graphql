import * as express from 'express';

export const router: express.Router = express.Router();

router.get('/', (req, res) => {
  //res.send('Index page');
  res.render('index');
})

router.get('health-check', (req, res) => {
  res.format({
    text: () => {
      res.send('OK');
    },      
    json: () => {
      res.send({ ok: true });
    }
  })
})