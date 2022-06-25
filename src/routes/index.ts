import { Router } from 'express';
import { authentication } from '../middlewares/authentication';
import { refreshTokenMiddleware } from '../middlewares/refreshMiddleware';
import { ordersFactory } from '../provider/OrdersFactory';
import { tokenFactory } from '../provider/TokenFactory';
import { userFactory } from '../provider/UsersFactory';

const router = Router();

router.get('/', (req, res) => {
  res.send('<h1>Whyy</h1>');
});

router.post('/create/user', (request, response) => {
  userFactory().create(request, response);
});
router.post('/login/user', (request, response) => {
  userFactory().login(request, response);
});

router.get('/users', authentication, (request, response) => {
  userFactory().findAll(request, response);
});

router.put('/token/refresh', refreshTokenMiddleware, (request, response) => {
  tokenFactory().refresh(request, response);
});

router.get('/order/all', (request, response) => {
  ordersFactory().findMany(request, response);
});

router.post('/order/create', (request, response) => {
  ordersFactory().create(request, response);
});

router.put('/order/update', (request, response) => {
  ordersFactory().update(request, response);
});

router.delete('/order/delete/:id', (request, response) => {
  ordersFactory().update(request, response);
});

export { router };
