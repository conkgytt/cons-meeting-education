const authList = JSON.parse(process.env.AUTH_LIST);

// Init Google Calendar API
const { google } = require("googleapis");
const { OAuth2 } = google.auth;
const currentAuthIndex = process.env.AUTH_INDEX;
const oAuth2Client = new OAuth2(
	authList[currentAuthIndex].clientId,
	authList[currentAuthIndex].clientSecret
);

oAuth2Client.setCredentials({
	refresh_token: authList[currentAuthIndex].refreshToken,
});

module.exports.calendar = google.calendar({
	version: "v3",
	auth: oAuth2Client,
});
module.exports.calendarId = authList[currentAuthIndex].calendarId;
