import { OrdersController } from '../controllers/Orders.controller';
import { OrdersRepository } from '../repositories/Orders.repository';
import { OrdersService } from '../services/Orders.service';

function ordersFactory() {
  const ordersRepository = new OrdersRepository();
  const ordersServices = new OrdersService(ordersRepository);
  const ordersController = new OrdersController(ordersServices);

  return ordersController;
}

export { ordersFactory };
