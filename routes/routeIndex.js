const createEventRouter = require("./routeCreateEvent");
const deleteEventRouter = require("./routeDeleteEvent");
const updateEventRouter = require("./routeUpdateEvent");
const authRouter = require("./routeLoginGoogle");

function RouteIndex(app) {
	app.use("/create", createEventRouter);
	app.use("/delete", deleteEventRouter);
	app.use("/update", updateEventRouter);
	app.post("/auth", authRouter);
}

module.exports = RouteIndex;
