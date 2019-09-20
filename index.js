const { GraphQLServer } = require('graphql-yoga')

let links = [{
  id: 'link-0',
  url: 'www.howtographql.com',
  description: 'Fullstack tutorial for GraphQL'
}]

let idCount = links.length

const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    feed: () => links,
    link: (parent, args) => links.find((link) => link.id === args.id)
  },
  Mutation: {
    post: (parent, args) => {
      const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url
      }

      links.push(link)
      return link
    },
    updateLink: (parent, args) => {
      const linkIndex = links.findIndex((link) => link.id === args.id)
      links[linkIndex] =  {...links[linkIndex], ...args };
      
      return links[linkIndex];
    },
    deleteLink: (parent, args) => {
      const linkIndex = links.findIndex(link => link.id === args.id);
      const link = links[linkIndex]
      links.splice(linkIndex, 1)

      return link;
    }
  }
}

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers
})

server.start(() => console.log('server is running'))