function TimeReformat (time) {
  const AMPMFormat = /^\d{2}:\d{2}\D{2}$/;
  if (AMPMFormat.test(time)) {
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
      time = `0${time.slice(0,1)}:${time.slice(1,3)}`;
    }
    if (pm === true) {
      time = `${Number(time.slice(0,2))+12}:${time.slice(2,time.length)}`;
    }
    return time;
  }
  return time.slice(0,5);
}

export default TimeReformat;

