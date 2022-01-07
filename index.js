const express = require("express");
const cors = require("cors");
const app = express();

require("dotenv").config();

const port = process.env.PORT || process.env.LOCAL_PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const routeIndex = require("./routes/routeIndex");
routeIndex(app);

app.listen(port, () =>
	console.log(`Server is started! - http://localhost:${port}`)
);
