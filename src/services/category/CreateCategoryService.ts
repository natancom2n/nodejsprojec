import prismaClient from "../../prisma";

interface CategoryRequest {
    name: string;
}

class CreateCategoryService {
    async execute({ name }: CategoryRequest) {
        // return { ok: true }
        if (name === '') {
            throw new Error('Name invalid')
        }
        const category = await prismaClient.category.create({
            data: {
                name: name,
            },
            //select whats will be show on return 
            select: {
                id: true,
                name: true,
            }
        })

        return category;
    }
}

export { CreateCategoryService }