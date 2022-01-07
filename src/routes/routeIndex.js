const createEventRouter = require("./routeCreateEvent");
const deleteEventRouter = require("./routeDeleteEvent");
const updateEventRouter = require("./routeUpdateEvent");
const routeProfile = require("./routeAddProfile");
const cors = require("cors");

function RouteIndex(app) {
	app.use("/create", cors(), createEventRouter);
	app.use("/delete", cors(), deleteEventRouter);
	app.use("/update", cors(), updateEventRouter);
	app.use("/profile", cors(), routeProfile);
}

module.exports = RouteIndex;
