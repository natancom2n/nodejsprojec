import prismaClient from "../../prisma";

class DetailUserService {
    async execute(user_id: string) {
        //go in the data base search if ID exist
        const user = await prismaClient.user.findFirst({
            where: {
                id: user_id
            },
            //choose which return you want
            select: {
                id: true,
                name: true,
                email: true
            }
        })


        // return ({ ok: true })
        return user;
    }
}

export { DetailUserService }