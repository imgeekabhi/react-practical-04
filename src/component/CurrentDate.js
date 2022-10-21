function CurrentDate() {
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, "0");
  return dd;
}
export default CurrentDate;
