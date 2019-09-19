const { GraphQLServer } = require('graphql-yoga')

const typeDefs = `
  type Query {
    info: String!
  }
`

const resolvers = {
  Query: {
    info: () => 'This is the API of the Hackernew Clone'
  }
}

const server = new GraphQLServer({
  typeDefs,
  resolvers
})

server.start(() => console.log('server is running'))