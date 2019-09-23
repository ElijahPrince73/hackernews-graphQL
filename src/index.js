const { GraphQLServer } = require('graphql-yoga')
const { prisma } = require("./generated/prisma-client");


const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    feed: (root, args, context) => context.prisma.links(),
    link: (parent, args) => links.find(link => link.id === args.id)
  },
  Mutation: {
    post: (root, args, context) => {
      return context.prisma.createLink({
        description: args.description,
        url: args.url
      });
    },
    updateLink: (parent, args) => {
      const linkIndex = links.findIndex(link => link.id === args.id);
      links[linkIndex] = { ...links[linkIndex], ...args };

      return links[linkIndex];
    },
    deleteLink: (parent, args) => {
      const linkIndex = links.findIndex(link => link.id === args.id);
      const link = links[linkIndex];
      links.splice(linkIndex, 1);

      return link;
    }
  }
};

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: { prisma }
})

server.start(() => console.log('server is running'))