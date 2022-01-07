const express = require("express");
const cors = require("cors");
const app = express();

require("dotenv").config();

const port = process.env.PORT || process.env.LOCALPORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
	cors({
		origin: "https://meet.google.com",
		methods: ["GET", "POST", "DELETE", "UPDATE"],
		credentials: true,
	})
);

const routeIndex = require("./routes/routeIndex");
routeIndex(app);

app.listen(port, () =>
	console.log(`Server is started! - http://localhost:${port}`)
);
