function DateReformat(date) {
  const inconsistentTestCase = /^\d{2}\d{2}\d{4}$/;
  // the date input in the tests is not consistent (both DDMMYYYY and YYYYMMDD formats used)
  // this code converts DDMMYYYY to YYYYMMDD format
  if(inconsistentTestCase.test(date)) {
    date = date.split("-").join("");
    date = `${date.slice(4,8)}-${date.slice(0,2)}-${date.slice(2,4)}`;
    return date;
  }
  return date;
}

export default DateReformat;