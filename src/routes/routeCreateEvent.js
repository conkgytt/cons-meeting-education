const express = require("express");
const router = express.Router();

const { calendar, calendarId } = require("../calendar");

router.post("/", (req, res, next) => {
	const summary = `${req.body.subjects} - ${req.body.name}`;
	const attendees = req.body.members.map((content) => ({
		email: content,
	}));
	const startAt = new Date(req.body.start);
	startAt.setHours(startAt.getHours() - 7);
	const endAt = new Date(startAt.valueOf());
	endAt.setMinutes(endAt.getMinutes() + Number(req.body.duration));

	const event = {
		summary,
		location: `Chỗ học`,
		description: `Phòng thảo luận nhóm.`,
		colorId: 3,
		attendees,
		start: {
			dateTime: startAt,
			timeZone: "+7",
		},
		end: {
			dateTime: endAt,
			timeZone: "+7",
		},
		conferenceData: {
			createRequest: {
				conferenceSolutionKey: {
					type: "hangoutsMeet",
				},
				requestId: "random string",
			},
		},
		guestsCanInviteOthers: false,
		guestsCanModify: false,
		guestsCanSeeOtherGuests: true,
		reminders: {
			overrides: [
				{
					method: "popup",
					minutes: 10,
				},
			],
			useDefault: false,
		},
	};

	const calendarInsertOption = {
		calendarId: calendarId,
		conferenceDataVersion: 1,
		sendNotifications: false,
		resource: event,
	};
	const calendarInsertCallback = (err, event) => {
		if (err) {
			console.error("Error creating calender event!", err);
			res.json({
				success: false,
				errors: err.errors,
			});
		} else {
			console.log("Calendar event successfully created!", event.data);

			const startAtLocalUTC = new Date(startAt.valueOf());
			startAtLocalUTC.setHours(
				startAt.getHours() + 7 - startAt.getTimezoneOffset() * 60
			);
			const endAtLocalUTC = new Date(endAt.valueOf());
			endAtLocalUTC.setHours(
				endAt.getHours() + 7 - endAt.getTimezoneOffset() * 60
			);

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

	calendar.events.insert(calendarInsertOption, calendarInsertCallback);
});

module.exports = router;
