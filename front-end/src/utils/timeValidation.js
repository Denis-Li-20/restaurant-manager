function TimeValidation(date, time) {
  if(!time) return "Please enter time in 00:00 - 23:59 OR 00:00 [AM/PM] format"
  // Checking if time matches 00:00 - 23:59 format

  let timeRegexExpression = /^([0-1][0-9]|2[0-3])([0-5][0-9])$/;
  let inconsistentTestCase = /^([0-1][0-9]|2[0-3]):([0-5][0-9])$/;
  // back-end tests pass reservation_date and reservation time as strings
  // this in turn causes "split-validation"
  // date comparison will run 4 times in dateValidation and timeValidation [front - and back - end]
  const dateRes = parseInt(date.split("-").join(""));
  let dateNow = `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()}`;
  dateNow = parseInt(dateNow.split("-").join(""));

  if (dateNow === dateRes) {
    let currentTime = parseInt(`${new Date().getHours()}${new Date().getMinutes()}`);
    if (currentTime > time) {
      return `The reservation should be in the future!`;
    }
  }

  if(!time.match(timeRegexExpression) && !time.match(inconsistentTestCase)) return `Please enter time in 00:00 - 23:59 format`
  const HHMM = Number(time.replace(":","")); 
  const openingTime = 1030;
  const closingTime = 2130;
  if (HHMM < openingTime) return `The restaurant is closed at ${time}!`
  if (HHMM >= (closingTime-30) && HHMM < closingTime) return `The reservation time ${time} is too close to the restaurant closing time!`
  if (HHMM >= closingTime) return `The restaurant is closed at ${time}!`
  return "";
}

export default TimeValidation;