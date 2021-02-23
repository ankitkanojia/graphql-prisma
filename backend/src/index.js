const { ApolloServer } = require('apollo-server');
const resolvers = require('./resolver')
const path = require('path');
const { readFileSync } = require('fs')
// we must convert the file Buffer to a UTF-8 string
const typeDefs = readFileSync(path.join(__dirname, '/schema.graphql')).toString('utf-8') 

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
