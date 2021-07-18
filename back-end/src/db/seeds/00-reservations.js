/*
const { random } = require("nanoid");

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}

// timeOpen and timeClosed should be provided in HH:MM format
function getRandomOpenTime(timeOpen, timeClosed) {
	// converting HH and MM parts into integers
	const hourOpen = parseInt(timeOpen.split(":")[0], 10);
	const hourClosed = parseInt(timeClosed.split(":")[0], 10);
	const minuteOpen = parseInt(timeOpen.split(":")[1], 10);
	const minuteClosed = parseInt(timeClosed.split(":")[1], 10);
	// hours should be randomized including min and max
	const randomHour = getRandomIntInclusive(hourOpen,hourClosed);
	// minutes should be randomized excluding the max
	let randomMinute;
	if (randomHour === hourClosed) { // edge case
		randomMinute = getRandomInt(0, minuteClosed);
	}
	else if (randomHour === hourOpen) { // edge case
		randomMinute = getRandomInt(minuteOpen, 60);
	}
	else { // general case
		randomMinute = getRandomInt(0, 60);
	}
	return `${randomHour}:${randomMinute}`;
}

exports.seed = function (knex) {
	// getting number of days in this month
	const now = new Date();
	let daysThisMonth = new Date(now.getFullYear(), now.getMonth()+1, 0).getDate();
	// leaving all days except for Tuesdays
	let daysRestarauntIsOpen = [];
	for (let i = 1; i <= daysThisMonth; i++) {
		const dateToCheck = new Date(now.getFullYear(), now.getMonth, i);
		if (dateToCheck.getDay() !== 2) {
			daysRestarauntIsOpen.push(i);
		};
	};

	const faker = require("faker");
	//let date = `${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDate()}`;
  const numberOfRecords = 200;
	let reservations = [];

	for (let i = 0; i < numberOfRecords; i++) {
		const randomOpenDay = daysRestarauntIsOpen[Math.floor(Math.random()*daysRestarauntIsOpen.length)];
		const randomOpenDate = `${new Date().getFullYear()}-${new Date().getMonth()+1}-${randomOpenDay}`;
		const randomOpenTime = getRandomOpenTime("10:30", "21:30");
		reservations.push({
			"first_name": faker.name.firstName(),
			"last_name": faker.name.lastName(),
			"mobile_number": faker.phone.phoneNumberFormat(),
			"reservation_date": randomOpenDate,
			"reservation_time": randomOpenTime,
			"people": getRandomIntInclusive(1,6),
			"created_at": new Date(),
			"updated_at": new Date(),
		})
	}
	return knex
	.raw("TRUNCATE TABLE reservations RESTART IDENTITY CASCADE")
    .then(function () {
      // Inserts seed entries
      return knex("reservations").insert(reservations);
    });
};
*/

//Dataset below passes all back-end tests
exports.seed = function (knex) {
return knex
.raw("TRUNCATE TABLE reservations RESTART IDENTITY CASCADE")
	.then(function () {
		// Inserts seed entries
		return knex("reservations").insert([
		  {
			"first_name": "Rick",
			"last_name": "Sanchez",
			"mobile_number": "202-555-0164",
			"reservation_date": "2020-12-31",
			"reservation_time": "20:00:00",
			"people": 6,
			"created_at": "2020-12-10T08:30:32.326Z",
			"updated_at": "2020-12-10T08:30:32.326Z"
		  },
		  {
			"first_name": "Frank",
			"last_name": "Palicky",
			"mobile_number": "202-555-0153",
			"reservation_date": "2020-12-30",
			"reservation_time": "20:00",
			"people": 1,
			"created_at": "2020-12-10T08:31:32.326Z",
			"updated_at": "2020-12-10T08:31:32.326Z"
		  },
		  {
			"first_name": "Bird",
			"last_name": "Person",
			"mobile_number": "808-555-0141",
			"reservation_date": "2020-12-30",
			"reservation_time": "18:00",
			"people": 1,
			"created_at": "2020-12-10T08:31:32.326Z",
			"updated_at": "2020-12-10T08:31:32.326Z"
		  },
		  {
			"first_name": "Tiger",
			"last_name": "Lion",
			"mobile_number": "808-555-0140",
			"reservation_date": "2025-12-30",
			"reservation_time": "18:00",
			"people": 3,
			"created_at": "2020-12-10T08:31:32.326Z",
			"updated_at": "2020-12-10T08:31:32.326Z"
		  },
		  {
			"first_name": "Anthony",
			"last_name": "Charboneau",
			"mobile_number": "620-646-8897",
			"reservation_date": "2026-12-30",
			"reservation_time": "18:00",
			"people": 2,
			"created_at": "2020-12-10T08:31:32.326Z",
			"updated_at": "2020-12-10T08:31:32.326Z"
		  }
		]);
	});
}
