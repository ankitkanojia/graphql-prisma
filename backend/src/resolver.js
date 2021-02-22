const { prisma } = require('./db')

const Query = {
    getUsers: async () => {
        const allUsers = await prisma.user.findMany();
        return allUsers;
    }
}

const Mutation = {
    createUser: async (root, args, context, info) => {
        await prisma.user.create({
            data: {
                name: args.name,
                email: args.email,
            }
        })
        return await prisma.user.findMany()
    },
    updateUser: async (root, args, context, info) => {
        await prisma.user.update({
            where: { id: Number(args.id) },
            data: {
                name: args.name,
                email: args.email,
            }
        })
        return await prisma.user.findMany()
    },
    deleteUser: async (root, args, context, info) => {
        await prisma.user.delete({
            where: { id: Number(args.id) }
        })
        return await prisma.user.findMany()
    }
}

module.exports = { Query, Mutation }

