import { Router } from 'express';
import { authentication } from '../middlewares/authentication';
import { tokenFactory } from '../provider/TokenFactory';
import { userFactory } from '../provider/UsersFactory';

const router = Router();

router.get('/', (req, res) => {
  res.send('<h1>Hello express</h1>');
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

router.put('/token/refresh', authentication, (request, response) => {
  tokenFactory().refresh(request, response);
});

export { router };
