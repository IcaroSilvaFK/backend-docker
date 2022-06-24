import { Router } from 'express';
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

router.get('/users', (request, response) => {
  userFactory().findAll(request, response);
});

export { router };
