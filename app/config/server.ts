import env from '@config/env';
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs } from '@graphql/typeDefs';
import { resolvers } from '@graphql/resolvers';
import { GraphQLError } from 'graphql/error';

class Server {
  private server: ApolloServer;

  constructor() {
    this.server = new ApolloServer({
      typeDefs,
      resolvers,
    });
  }

  public async start(): Promise<void> {
    const { url } = await startStandaloneServer(this.server, {
      listen: { port: env.port },
      context: async ({ req }) => {
        // const token = req.headers.authorization || '';
        const user = {};

        if (!user) {
          throw new GraphQLError('User is not authenticated', {
            extensions: {
              code: 'UNAUTHENTICATED',
              http: { status: 401 },
            },
          });
        }

        return { user };
      },
    });

    console.log(`🚀  Server ready at: ${url}`);
  }
}

export const server = new Server();
