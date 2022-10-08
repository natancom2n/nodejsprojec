import { Request, Response } from 'express';
import { CreateCategoryService } from '../../services/category/CreateCategoryService';

class CreateCategoryController {
    async handle(req: Request, res: Response) {

        //get the body of request
        const { name } = req.body;

        const createCategoryService = new CreateCategoryService();
        const category = await createCategoryService.execute({
            name

        })
        return res.json(category);
    }
}

export { CreateCategoryController }