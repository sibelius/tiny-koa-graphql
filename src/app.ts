import Koa from "koa";
import Router from "koa-router";
import bodyParser from "koa-bodyparser";
import convert from "koa-convert";
import cors from "koa-cors";
import { koaPlayground } from "graphql-playground-middleware";
import graphqlHttp from "koa-graphql";
import { config } from "./config";
import { schema } from "./schema/schema";

const app = new Koa();
const router = new Router();

app.use(bodyParser());
app.use(convert(cors({ maxAge: 86400, credentials: true })));

router.get('/', ctx => {
  const info = [
    '/graphql - GraphiQL',
    '/playground - GraphQL Playground',
    '/status - Status server'
  ]

  ctx.status = 200;
  ctx.body = info.join('\n');
})
router.get("/status", (ctx) => {
  ctx.status = 200;
  ctx.body = "running";
});

router.all(
  "/playground",
  koaPlayground({
    endpoint: "/graphql",
  })
);

const appGraphQL = convert(
  graphqlHttp(async (request: Request, ctx: Response, koaContext) => {
    return {
      graphiql: config.NODE_ENV !== "production",
      schema,
      rootValue: {
        request: ctx.req,
      },
      context: {
        koaContext,
      },
    };
  })
);

router.all("/graphql", appGraphQL);

app.use(router.routes()).use(router.allowedMethods());

export default app;
