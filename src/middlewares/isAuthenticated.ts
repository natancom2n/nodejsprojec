import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';


interface PayLoad {
    sub: string;

}

export function isAuthenticated(
    req: Request,
    res: Response,
    next: NextFunction
) {
    //recived the token
    const authToken = req.headers.authorization;

    if (!authToken) {

        return res.status(401).end();
    }

    //console.log(authToken);

    //    " " is the space bcouse the token come Bearer (space) and after the token
    //[, token] = this case is note necessáry the firt item "Bearer" so I`m ignoring.
    const [, token] = authToken.split(" ");
    //console.log(token);

    try {
        //validate this token
        //add to sub the ID of user
        const { sub } = verify(
            token,
            //the secret of JWT is in .env 
            process.env.JWT_SECRET,
        ) as PayLoad;

        //recover the user ID inside the Request (req)
        req.user_id = sub;

        // console.log(sub);
        return next();
    } catch (error) {
        return res.status(404).end();
    }

}