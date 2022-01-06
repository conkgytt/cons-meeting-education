// Express
const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const routeIndex = require("./routes/routeIndex");
routeIndex(app);

app.listen(port, () =>
	console.log(`Server is started! - http://localhost:${port}`)
);
