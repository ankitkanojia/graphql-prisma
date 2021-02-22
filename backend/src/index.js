const { ApolloServer } = require('apollo-server');
const resolvers = require('./resolver')
 
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
