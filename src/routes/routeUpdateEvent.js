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
	startAt.setHours(startAt.getHours() - 7);
	const endAt = new Date(startAt.valueOf());
	endAt.setMinutes(endAt.getMinutes() + Number(req.body.duration));

	const newEvent = {
		summary,
		attendees,
		start: {
			dateTime: startAt,
			timeZone: "+7",
		},
		end: {
			dateTime: endAt,
			timeZone: "+7",
		},
	};

	const updateOption = { calendarId, eventId, requestBody: newEvent };
	const updateHandle = (err, event) => {
		if (err) {
			console.log("Update error!", err);
			res.json({ success: false, errors: err.errors });
		} else {
			console.log("Update success!", event.data);
			res.json({ success: true, startAt, endAt });

			const startAtLocalUTC = new Date(startAt.valueOf());
			startAtLocalUTC.setHours(
				startAt.getHours() + 7 - startAt.getTimezoneOffset() * 60
			);
			const endAtLocalUTC = new Date(endAt.valueOf());
			endAtLocalUTC.setHours(
				endAt.getHours() + 7 - endAt.getTimezoneOffset() * 60
			);

			console.log(startAtLocalUTC, endAtLocalUTC);

			res.json({
				success: true,
				summary,
				startAt: startAtLocalUTC,
				endAt: endAtLocalUTC,
				googleMeetLink: event.data.hangoutLink,
				eventId: event.data.id,
			});
		}
	};

	calendar.events.update(updateOption, updateHandle);
});

module.exports = router;
