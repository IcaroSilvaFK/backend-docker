import { TokenController } from '../controllers/Token.controller';
import { TokenRepository } from '../repositories/Tokens.repository';
import { TokenService } from '../services/Token.service';

function tokenFactory() {
  const tokenRepository = new TokenRepository();
  const tokenService = new TokenService(tokenRepository);

  const tokenController = new TokenController(tokenService);

  return tokenController;
}

export { tokenFactory };
