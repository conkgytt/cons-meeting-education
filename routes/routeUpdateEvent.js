const express = require("express");
const router = express.Router();

const { calendar, calendarId } = require("../calendar");

router.patch("/", (req, res, next) => {
	const eventId = req.body.eventId;
	const summary = `${req.body.subjects} - ${req.body.name}`;
	const attendees = req.body.members.map((content) => ({
		email: content,
	}));
	const startAt = new Date(req.body.start);
	const endAt = new Date(startAt.valueOf());
	endAt.setMinutes(endAt.getMinutes() + Number(req.body.duration));

	const newEvent = {
		summary,
		attendees,
		start: {
			dateTime: startAt,
		},
		end: {
			dateTime: endAt,
		},
	};

	const updateOption = { calendarId, eventId, requestBody: newEvent };
	const updateHandle = (err, event) => {
		if (err) {
			console.log("Update error!", err);
			res.json({ success: false, errors: err.errors });
		} else {
			console.log("Update success!");
			res.json({ success: true, startAt, endAt });
		}
	};

	calendar.events.update(updateOption, updateHandle);
});

module.exports = router;
