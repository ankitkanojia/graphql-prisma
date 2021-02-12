const { ApolloServer } = require('apollo-server');
const { prisma } = require('./db')

// graphql schema
const typeDefs = `
  type Query {
    getUsers: [User]
  }

  type Mutation {
    createUser(email: String, name:String): [User],
    updateUser(id: ID!, email: String, name:String): [User],
    deleteUser(id: ID!): [User]
  }

  type User {
    id: ID     
    email: String  
    name: String
 }
`

// graphql resolver
const resolvers = {
  Query: {
    getUsers: async () => {
      const allUsers = await prisma.user.findMany();
      return allUsers;
    }
  },
  Mutation: {
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
}

// configured apollo server
const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server
  .listen()
  .then(({ url }) =>
    console.log(`Server is running on ${url}`)
  );
