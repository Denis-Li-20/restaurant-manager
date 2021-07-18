const reservationsService = require("./reservations.service.js");

function TimeReformat (time) {
  // Removing spaces
  time = time.split(" ").join("");

  // Converting to lower cases
  time = time.toLowerCase();
  
  // Converting 12 to 24 hours format
  let pm = false;
  if (time.slice(-2) === "pm") pm = true;

  // Removing am, pm and ":"
  time = time.split(/[am,pm,:]/i).join("");
  if (time.length === 3) {
    time = "0"+time;
  }
  if (pm === true) {
    time = Number(time.slice(0,2))+12+time.slice(2,time.length);
  }
  return time;
}

async function reservationFieldsValid (request, response, next) {
  const { data = {} } = request.body;
  const reservationFields = [
    "first_name",
    "last_name",
    "mobile_number",
    "reservation_date",
    "reservation_time",
    "people",
  ];
  if (!data.status) data.status = "booked";

  let field;
  for(let i = 0; i < reservationFields.length; i++) {
    field = reservationFields[i];
    
    // removing spaces
    if (data[field] && !Number.isInteger(data[field])) data[field].split(" ").join("");
    if (!data[field]) {
      return next ({
        status: 400,
        message: `Field ${field} is empty, this is not allowed!`,
      });
    };
  }

  if(!data.people) {
    return next ({
      status: 400,
      message: `people field value is missing!`
    })
  }

  if(!Number.isInteger(data.people)) {
    return next ({
      status: 400,
      message: `people field must be a number!`,
    })
  }
  response.locals.reservation = data;
  next();
}

function reservationDateValid (request, response, next) {
      /* *** Format Validation *** */ 
      /* *** Format Validation *** */ 
      //const { data = {} } = request.body;
      const reservation = response.locals.reservation;
      const reservationDate = reservation.reservation_date;
      // First check for the pattern
      const regex_date = /^\d{4}\-\d{1,2}\-\d{1,2}$/;
      // add validation for ("31 of February")
      if(!regex_date.test(reservationDate))
      {
        return next ({
          status: 400,
          message: `reservation_date field value (${reservationDate}) is not correct. Please enter date in YYYY-MM-DD format!`,
        });
      }
      
      /* *** [Year, Month, Day, Leap Year] Validation *** */
      /* *** [Year, Month, Day, Leap Year] Validation *** */
      const parts = reservationDate.split("-");
      const day = parseInt(parts[2], 10);
      const month = parseInt(parts[1], 10);
      const year = parseInt(parts[0], 10);
      
      // Check the ranges of month and year
      if(year < 1000 || year > 3000 || month == 0 || month > 12) return false;
      const monthLength = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];
      
      // Adjust for leap years
      if(year % 400 == 0 || (year % 100 != 0 && year % 4 == 0)) monthLength[1] = 29;
  
      // Check the range of the day
      if (!(day > 0 && day <= monthLength[month - 1])) {
        return next ({
          status: 400,
          message: `reservation_date field value (${reservationDate}) is not correct. Please enter date in YYYY-MM-DD format!`,
        });
      }

      /* *** Future Validation *** */
      const addZeros = (date) => {
        let newDate = date.split("-")
        newDate = newDate.map((datePart) => {
          if(datePart.length === 1) {
            return datePart = "0"+datePart;
          } else {
            return datePart;
          }
        })
        return newDate;
      }
      let dateRes = addZeros(reservationDate);
      dateRes = parseInt(dateRes.join(""));
      let dateNow = `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()}`;
      dateNow = addZeros(dateNow);
      dateNow = parseInt(dateNow.join(""));
      if (dateNow > dateRes) {
        return next ({ 
          status: 400, 
          message: `the reservation should be in the future!`,
        });
      }
      /* *** Tuesdays Validation *** */
      let reservationDayOfWeek = new Date(reservationDate).getDay();
      if (reservationDayOfWeek == 1) {
        return next ({
          status: 400,
          message: `the restaurant is closed on Tuesdays!`,
        });
      }
      next();
}

function reservationTimeValid (request, response, next) {
  const reservation = response.locals.reservation;
  // Checking if time matches 00:00 - 23:59 format
  const timeRegexExpression = /^([0-1][0-9]|2[0-3])([0-5][0-9])$/;
  const reservationTime = TimeReformat(reservation.reservation_time);

  if(!reservationTime) {
    return next ({
      status: 400,
      message: `reservation_time field is missing!`,
    })
  }

  if(!reservationTime.match(timeRegexExpression)) {
    return next ({
      status: 400,
      message: `reservation_time field value (${reservationTime}) is not correct. Please enter time in 00:00 - 23:59 format!`,
    });
  };
  const HHMM = Number(reservationTime.replace(":","")); 
  const openingTime = [1030];
  const closingTime = [2130];
  if (HHMM < openingTime || HHMM > closingTime) {
    return next ({
      status: 400,
      message: `the restaurant is closed!`,
    });
  }
  
  next();
}

async function createReservation (request, response, next) {
  /* ---This is a workaround--- */
  if (response.locals.reservation.status == "booked") {
    const [data] = await reservationsService.createReservationService(request.body.data);
    response.status(201).json({ data });
  } else {
    return next({ status: 400, message: `status is either incorrect or seated/finished`,
    });
  };
}

async function listReservations (request, response) {
  const mobileNumber = request.query.mobile_number;
  let data;
  if (mobileNumber) {
    data = await reservationsService.listReservationsByMobileService(mobileNumber);
  } else {
    let date = request.query.date;
    if (!date) date = `${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDate()}`
    
    data = await reservationsService.listReservationsByDateService(date);
  }
  response.json ({ data });
}

async function reservationExists (request, response, next) {
  let reservationId = request.params.reservationId;
  reservationId = parseInt(reservationId)
  const reservation = await reservationsService.readReservationService(reservationId);
  
  if (reservation) {
    response.locals.reservation = reservation;
    return next();
  }
  next ({ status: 404, message: `Reservation ${reservationId} cannot be found!`});
}

function readReservation (request, response, next) {
  const data = response.locals.reservation;
  response.json({ data });
}

async function updateReservationValidation (request, response, next) {
  const { data = { } } = request.body;
  const reservationId = request.params.reservationId;
  const currentReservation = await reservationsService.readReservationService(reservationId);

  // this part of code exists because of US-08 last test case
  const requestKeys = Object.keys(data);
  let newReservation = {...data};

  newReservation.reservation_id = reservationId;

  if (!currentReservation) return next ({ status: 404, message: `Reservation ${reservationId} does not exist!`});
  
  if (currentReservation.status == "finished") return next ({ status: 400, message: `Can't update finished reservation`});
  
  if (currentReservation.status === "cancelled") {
    //newReservation.status = "cancelled";
    newReservation = currentReservation;
  }
  // unique validation: status, date is date, time is time
  const statuses = [undefined, "booked", "seated", "finished", "cancelled"];
  
  // incorrect reservation status
  if (!statuses.includes(newReservation.status) || !newReservation) return next ({ status: 400, message: `Status unknown ${data.status}`});
  response.locals.reservation = newReservation;
  const reservationColumns = [
    "reservation_id", "first_name", "last_name", "mobile_number",
    "reservation_date", "reservation_time", "people"
  ];
  for (let i = 0; i < reservationColumns.length; i++) {
    const currentColumn = reservationColumns[i];
    if (!newReservation[currentColumn]) {
      return next ({ 
        status: 400, 
        message: `${currentColumn} is missing!`,
      });
    }
    else if (newReservation[currentColumn] === "") {
      return next ({
        status: 400,
        message: `${currentColumn} is empty!`,
      });
    };
  };
  // date validation
  let reservationDate = new Date(newReservation.reservation_date);
  reservationDate = `${reservationDate.getFullYear()}-${reservationDate.getMonth()}-${reservationDate.getDate()}`
 
  const regex_date = /^\d{4}\-\d{1,2}\-\d{1,2}$/;
  if(!regex_date.test(reservationDate)) {
    return next ({ 
      status: 400,
      message: `reservation_date field value (${reservationDate}) is not correct. 
              Please enter time in 00:00 - 23:59 format!`,
    });
  };
  // time validation
  let reservationTime = newReservation.reservation_time.split(":");
  reservationTime = `${reservationTime[0]}:${reservationTime[1]}`
  const timeRegexExpression = /^([0-1][0-9]|2[0-3]):([0-5][0-9])$/;
  if(!reservationTime.match(timeRegexExpression)) {
    return next ({
      status: 400,
      message: `reservation_time field value (${reservationTime}) is not correct`,
    });
  };
  // people validation
  if(!Number.isInteger(newReservation.people)) {
    return next ({
      status: 400,
      message: `people field is incorrect, please enter a number!`,
    });
  };
  next();
}

async function updateReservation (request, response, next) {
  const reservation = response.locals.reservation;
  const [data] = await reservationsService.updateReservationService(reservation);  
  response.status(200).json({ data });
}

async function updateReservationStatusValidation (request, response, next) {
  const { data = { } } = request.body;
  const reservationId = request.params.reservationId;
  const currentReservation = await reservationsService.readReservationService(reservationId);
  let newReservation = {...currentReservation,...data};
  const statuses = [undefined, "booked", "seated", "finished", "cancelled"];
  if (!currentReservation) return next ({ status: 404, message: `Reservation ${reservationId} does not exist!`});
  if (!statuses.includes(newReservation.status) || !newReservation) return next ({ status: 400, message: `Status unknown ${newReservation.status}`});
  if (currentReservation.status == "finished") return next ({ status: 400, message: `Can't update finished reservation`});
  response.locals.reservation = newReservation;
  next();
}

module.exports = {
  createReservation: [
    reservationFieldsValid,
    reservationDateValid,
    reservationTimeValid,
    createReservation,
  ],
  listReservations,
  readReservation: [
    reservationExists,
    readReservation,
  ],
  updateReservation: [
    updateReservationValidation,
    updateReservation,
  ],
  updateReservationStatus: [
    updateReservationStatusValidation,
    updateReservation,
  ]
};
