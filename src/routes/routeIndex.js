const createEventRouter = require("./routeCreateEvent");
const deleteEventRouter = require("./routeDeleteEvent");
const updateEventRouter = require("./routeUpdateEvent");
const routeProfile = require("./routeAddProfile");

function RouteIndex(app) {
	app.use("/create", createEventRouter);
	app.use("/delete", deleteEventRouter);
	app.use("/update", updateEventRouter);
	app.use("/profile", routeProfile);
}

module.exports = RouteIndex;
