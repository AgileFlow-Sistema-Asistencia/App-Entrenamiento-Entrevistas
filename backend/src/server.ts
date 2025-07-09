import 'reflect-metadata';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema, AuthChecker } from 'type-graphql';
import dotenv from 'dotenv';
import { connectDB } from './config/db';
import { UserResolver } from './modules/user/user.resolver';
import { MyContext } from './types/context';

dotenv.config();

// Función de autorización
const authChecker: AuthChecker<MyContext> = ({ context }, roles) => {
  // Si no hay roles específicos requeridos, solo verificar autenticación
  if (roles.length === 0) {
    return !!context.req.userId;
  }

  // Verificar si el usuario está autenticado
  if (!context.req.user) {
    return false;
  }

  // Verificar roles específicos
  return roles.includes(context.req.user.role.toUpperCase());
};

(async () => {
  await connectDB();

  const schema = await buildSchema({
    resolvers: [UserResolver],
    validate: false,
    authChecker, // Agregar la función de autorización
  });

  const server = new ApolloServer({
    schema,
    context: ({ req }): MyContext => ({ req }),
  });

  const app = express();
  await server.start();
  server.applyMiddleware({ app: app as any });

  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
  });
})();
