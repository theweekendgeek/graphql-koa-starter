// generic stuff
const http = require("http");
const typeDefs = require("./my-schema");
const resolvers = require("./resolver");
const PORT = 3031;

// set up express - works
// const express = require("express");
// const app = express();
// const { ApolloServer } = require("apollo-server-express");

// set up koa - does not work
const Koa = require("koa");
const app = new Koa();
const { ApolloServer } = require("apollo-server-koa");

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// express
// const httpServer = http.createServer(app);
// server.installSubscriptionHandlers(httpServer);

// httpServer.listen({ port: PORT }, () => {
//   console.log(
//     `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
//   );
//   console.log(
//     `🚀 Subscriptions ready at ws://localhost:${PORT}${server.subscriptionsPath}`
//   );
// });

// koa
app.use(async (ctx, next) => {
  await next();
  const rt = ctx.response.get("X-Response-Time");
  console.log(`${ctx.method} ${ctx.url} - ${rt}`);
});

// x-response-time

app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set("X-Response-Time", `${ms}ms`);
});

server.applyMiddleware({
  app,
});

const httpServer = http.createServer(app.callback());
server.installSubscriptionHandlers(httpServer);

httpServer.listen(3031);
console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
console.log(
  `🚀 Subscriptions ready at ws://localhost:${PORT}${server.subscriptionsPath}`
);
