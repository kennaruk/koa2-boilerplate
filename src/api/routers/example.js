import Debug from "debug";
const debug = Debug("ngmb:routers:user");

async function middleware(ctx, next) {
	debug("middleware");
	next();
}

async function example(ctx) {
	try {
		ctx.body = "hello"; //response
	} catch (error) {
		ctx.throw(400, error.message || error);
	}
}

const routes = [
	{
		method: "get",
		path: "/",
		middlewares: [middleware],
		handler: example
	}
];
export default routes;
