const express = require("express");
const cors = require("cors");

require("dotenv").config();
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const routeIndex = require("./routes/routeIndex");
routeIndex(app);

app.listen(port, () =>
	console.log(`Server is started! - http://localhost:${port}`)
);
