const moment = require("moment");
// console.log(new Date())
// const b = moment().format("2022-09-05")
// const a =moment(new Date).format("YYYY-MM-DD")
// console.log(a);
// console.log(b);

// console.log(moment("2022-09-05").isSame(moment(new Date, "YYYY-MM-DD")));
// console.log(moment(b).isSame(a));

// const todayData= new Date();
// const yesterday = moment(todayData.setDate(todayData.getDate()-1)).format("YYYY-MM-DD");
// const today = moment(new Date).format("YYYY-MM-DD");

// console.log(yesterday, today)
// console.log(typeof(moment().format(today)))
// console.log(typeof(today))

//const today = moment('2022-09-04').startOf('day');
//console.log(today)

const day = moment('2022-09-04').startOf("day").toDate();
console.log(day)

//const momentTimezone = require('moment-timezone');
//const dateKorea = momentTimezone.tz(Date.now(), "Asia/Seoul");

const today = moment().startOf("day");
const yesterday = moment(today).subtract(1, 'day');

console.log(today,yesterday)
console.log(moment(today).endOf('day') ,moment(yesterday).endOf('day'))