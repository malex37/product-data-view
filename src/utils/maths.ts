function getWeekOfYear(target: Date) {
  var temporary = new Date(Date.UTC(target.getFullYear(), target.getMonth(), target.getDate()));
  var numberOfDay = temporary.getUTCDay() || 7; // If 0 or whatever is sunday
  temporary.setUTCDate(temporary.getUTCDate() + 4 - numberOfDay);//force move it to start of week
  var startOfYear = new Date(Date.UTC(temporary.getUTCFullYear(), 0, 1));// start of the year
  // DateA - DateB works in browser but typescript complains vecause '-' uses Object.valueOf() to execute the operation
  // so Date doesn't satisfy this
  return Math.ceil((((temporary.valueOf() - startOfYear.valueOf()) / 86400000) + 1) / 7);
}
