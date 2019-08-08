import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import BalanceController from './app/controllers/BalanceController';
import TransferController from './app/controllers/TransferController';
import WithdrawalController from './app/controllers/WithdrawalController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.put('/users', UserController.update);

routes.get('/balance', BalanceController.index);
routes.put('/deposit', BalanceController.update);

routes.get('/transfer', TransferController.index);
routes.put('/transfer', TransferController.store);

routes.get('/withdrawal', WithdrawalController.index);
routes.put('/withdrawal', WithdrawalController.update);

export default routes;
