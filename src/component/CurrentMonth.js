function CurrentMonth() {
  const monthNames = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ];
  let today = new Date();
  let mm = String(monthNames[today.getMonth()]); //January is 0!
  return mm;
}
export default CurrentMonth;
