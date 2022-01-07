const express = require("express");
const cors = require("cors");
const app = express();
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

require("dotenv").config();

const port = process.env.PORT || process.env.LOCAL_PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
	cors({
		origin: "https://meet.google.com",
		methods: ["GET", "POST", "DELETE", "UPDATE"],
		credentials: true,
	})
);

const authInfo = JSON.parse(process.env.AUTH_LIST)[process.env.AUTH_INDEX];
const clientID = authInfo.clientId;
const clientSecret = authInfo.clientSecret;

passport.use(
	new GoogleStrategy(
		{
			clientID,
			clientSecret,
			callbackURL: "http://yourdomain:3000/auth/google/callback",
			passReqToCallback: true,
		},
		function (request, accessToken, refreshToken, profile, done) {
			User.findOrCreate({ googleId: profile.id }, function (err, user) {
				return done(err, user);
			});
		}
	)
);

const routeIndex = require("./routes/routeIndex");
routeIndex(app);

app.listen(port, () =>
	console.log(`Server is started! - http://localhost:${port}`)
);

module.exports.passport = passport;
