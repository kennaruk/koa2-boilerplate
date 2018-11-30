import "../env";

import logger from "koa-logger";
import bodyParser from "koa-bodyparser";
import serve from "koa-static";
import koaSwagger from "koa2-swagger-ui";
import Koa from "koa";

import router from "./routers";

const app = new Koa();

app.use(logger()); //logging
app.use(bodyParser()); //json, form enabled
app.use(serve(`${__dirname}/swaggers`));
app.use(
	koaSwagger({
		routePrefix: "/api-doc",
		swaggerOptions: {
			url: "/swagger.json"
		}
	})
);

app.use(router.routes()).use(router.allowedMethods());

app.listen(3000);
