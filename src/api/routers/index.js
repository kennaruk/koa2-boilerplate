import Router from "koa-router";
import fs from "fs";
import path from "path";
import Debug from "debug";
const debug = Debug("ngmb:routers");

const router = new Router();

const isRouteFile = file => file != "index.js";
const readRouteFiles = () => fs.readdirSync(__dirname).filter(isRouteFile);

const routeFiles = readRouteFiles();

const buildRoutes = ({ routes, basename }) => {
	routes.forEach(({ path, method, middlewares, handler }) => {
		const middlewaresAndHandler = [...middlewares, handler];
		debug(`build route: ${method} | /${basename}${path}`);
		router[method](`/${basename}${path}`, ...middlewaresAndHandler);
	});
};
const buildRoutesFromFiles = ({ routeFiles }) => {
	routeFiles.forEach(file => {
		const filePath = path.resolve(__dirname, file);
		const basename = path.basename(filePath, ".js");
		try {
			let { default: routes } = require(filePath);
			buildRoutes({ routes, basename });
		} catch (error) {
			throw error;
		}
	});
};

buildRoutesFromFiles({ routeFiles });

export default router;
