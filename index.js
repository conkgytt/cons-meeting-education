const express = require("express");
const cors = require("cors");
const app = express();
app.use(
	cors({
		origin: "*",
	})
);
require("dotenv").config();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const routeIndex = require("./routes/routeIndex");
routeIndex(app);

app.listen(port, () =>
	console.log(`Server is started! - http://localhost:${port}`)
);
