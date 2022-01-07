const path = require("path");
const express = require("express");
const cors = require("cors");
const app = express();
const handlebars = require("express-handlebars");

app.use(
	cors({
		origin: "https://meet.google.com",
	})
);

require("dotenv").config();

const port = process.env.PORT || process.env.LOCAL_PORT;

app.engine(".hbs", handlebars.engine({ extname: ".hbs" }));
app.set("view engine", ".hbs");
app.set("views", path.join(__dirname, "resources/views"));

app.use("/static", express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const routeIndex = require("./routes/routeIndex");
routeIndex(app);

app.listen(port, () =>
	console.log(`Server is started! - http://localhost:${port}`)
);
