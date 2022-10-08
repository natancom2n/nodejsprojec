import { Router } from 'express';
import { CreateUserController } from './controllers/user/CreateUserController';
import { AuthUserContoller } from './controllers/user/AuthUserContoller';
import { DetailUserController } from './controllers/user/DetailUserController';
import { isAuthenticated } from './middlewares/isAuthenticated';
import { CreateCategoryController } from './controllers/category/CreateCategoryController';

const router = Router();


//-- USER ROTES --
//for create (cadastrar) an user use post
router.post('/users', new CreateUserController().handle)
router.post('/session', new AuthUserContoller().handle)
router.get('/me', isAuthenticated, new DetailUserController().handle)

// --- Rotes and Categorys ----
//cadastrar Categoria é do tipo post
router.post('/category', isAuthenticated, new CreateCategoryController().handle)

export { router };