const { ApolloServer } = require('apollo-server');
const { prisma } = require('./db')

// graphql schema
const typeDefs = `
  type Query {
    getusers: [User]
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
    getusers: async () => {
        const allUsers = await prisma.user.findMany();
        return allUsers;
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
