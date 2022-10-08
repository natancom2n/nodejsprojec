import { Request, Response } from 'express';
import { DetailUserService } from '../../services/user/DetailUserService'

class DetailUserController {
    async handle(req: Request, res: Response) {

        //here get the user id inside the Request, inside the express
        //this is modificaded for me inside the /src/@types/express/index.d.ts and also has changed in tsconfig.json
        const user_id = req.user_id;
        // console.log("Id do user = ", user_id);

        const detailUserService = new DetailUserService();

        const user = await detailUserService.execute(user_id);

        return res.json(user);

    }
}

export { DetailUserController }