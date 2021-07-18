function DateValidation(date) {

  const regex_date = /^\d{4}-\d{1,2}-\d{1,2}$/;
  // add validation for ("31 of February")
  if(!regex_date.test(date)) return "Date should be in YYYY-MM-DD format"
  /* *** [Year, Month, Day, Leap Year] Validation *** */
  const parts = date.split("-");
  const day = parseInt(parts[2], 10);
  const month = parseInt(parts[1], 10);
  const year = parseInt(parts[0], 10);
  // Check the ranges of month and year
  if(year < 1000 || year > 3000 || month === 0 || month > 12) return false;
  const monthLength = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];
  
  // Adjust for leap years
  if(year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0)) monthLength[1] = 29;

  // Check the range of the day
  if (!(day > 0 && day <= monthLength[month - 1])) return "Date should be in YYYY-MM-DD format";

  /* *** Date is not Tuesday *** */
  let reservationDayOfWeek = new Date(date).getDay();
  if (reservationDayOfWeek === 1) return "The restaurant is closed on Tuesdays!";
  
  /* *** Date is current or future validation *** */
  // Input can be in YYYY-M-D / YYYY-MM-D / YYYY-MM-D formats
  // this function reformats dates to YYYY-MM-DD format
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

  let dateRes = addZeros(date);
  dateRes = parseInt(dateRes.join(""));

  let dateNow = `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()}`;
  dateNow = addZeros(dateNow);
  dateNow = parseInt(dateNow.join(""));

  if (dateNow > dateRes) return "Please book the future date";
  return "";

}

export default DateValidation;