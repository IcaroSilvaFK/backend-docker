import { UsersController } from '../controllers/Users.controller';
import { TokenRepository } from '../repositories/Tokens.repository';
import { UsersRepository } from '../repositories/Users.repository';
import { TokenService } from '../services/Token.service';
import { UserService } from '../services/Users.service';

function userFactory() {
  const userRepository = new UsersRepository();
  const tokenRepository = new TokenRepository();
  const userService = new UserService(userRepository);
  const tokenService = new TokenService(tokenRepository);
  const userController = new UsersController(userService, tokenService);
  return userController;
}

export { userFactory };
