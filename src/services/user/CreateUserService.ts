import prismaClient from '../../prisma';
import { hash } from 'bcryptjs';

interface UserRequest {
    name: string;
    email: string;
    password: string;
}


class CreateUserService {
    async execute({ name, email, password }: UserRequest) {


        //verify if email sending
        if (!email) {
            throw new Error("Incorrect E-mail!!")
            //verify if name is check
            if (!name) {
                throw new Error("Please add your name!!")
            }
        }

        //verify if email is existent in the db
        const userAlreadyExists = await prismaClient.user.findFirst({
            where: {
                email: email
            }
        })

        if (userAlreadyExists) {
            throw new Error("User Already Exist");
        }

        //criptography password
        const passwordHash = await hash(password, 8);


        //create the new user in DB
        const user = await prismaClient.user.create({
            data: {
                name: name,
                email: email,
                // password: password,
                password: passwordHash,
            },
            //select declare whats want return:
            select: {
                id: true,
                name: true,
                email: true,

            }
        })

        return (user);
    }
}

export { CreateUserService }