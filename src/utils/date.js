import moment from 'moment-timezone'

/**
 * 格式化日期，20180608 => 2018-06-08
 */
 export function standardTime (int, separator = '-') {
  let initStr = null
  if (typeof int === 'number') {
    int = int.toString()
  }
  initStr = int.slice(0, 4) + separator + int.slice(4, 6) + separator + int.slice(6, 8)
  return initStr
}

/**
 * 格式化日期，2018-06-08 => 20180608
 */
 export function standard2Time (int) {
  let initStr = ''
  initStr = initStr = int.slice(0, 4) + int.slice(5, 7) + int.slice(8, 10)
  return Number(initStr)
}

// 格式化日期
export function dateTime (inputTime, hhmmss = false) {
  var date = new Date(inputTime)
  var y = date.getFullYear()
  var m = date.getMonth() + 1
  m = m < 10 ? ('0' + m) : m
  var d = date.getDate()
  d = d < 10 ? ('0' + d) : d
  let str = y + '-' + m + '-' + d
  if (hhmmss) {
    var hh = date.getHours()
    hh = hh < 10 ? ('0' + hh) : hh
    var mm = date.getMinutes()
    mm = mm < 10 ? ('0' + mm) : mm
    var ss = date.getSeconds()
    ss = ss < 10 ? ('0' + ss) : ss
    str += ' ' + hh + ':' + mm + ':' +ss
  }
  return str
}

/**
 * 格式化时间
 */
 export function formatTime (time) {
  const date = new Date(time)
  const now = Date.now()
  const diff = (now - date) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) { // less 1 hour
    return Math.floor(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.floor(diff / 3600) + '小时前'
  }
  var y = date.getFullYear()
  var m = date.getMonth() + 1
  m = m < 10 ? ('0' + m) : m
  var d = date.getDate()
  d = d < 10 ? ('0' + d) : d
  var h = date.getHours()
  h = h < 10 ? ('0' + h) : h
  var min = date.getMinutes()
  min = min < 10 ? ('0' + min) : min
  return y + '-' + m + '-' + d + ' ' + h + ':' + min
}

// 得到今天日期
export function getToday() {
  let d = new Date();
  let year = d.getFullYear();
  let month = d.getMonth() + 1;
  let date = d.getDate();
  month = month < 10 ? "0" + month : month;
  date = date < 10 ? "0" + date : date;
  return year + "-" + month + "-" + date;
}

// 获取某个日期， N 天前的日期
export function getBeforeDate (startDate, n) {
  var date = new Date(startDate)
  var year, month, day, beforeDate
  date.setDate(date.getDate() - n + 1)
  year = date.getFullYear()
  month = date.getMonth() + 1
  day = date.getDate()
  beforeDate = year + '-' + (month < 10 ? ('0' + month) : month) + '-' + (day < 10 ? ('0' + day) : day)
  return beforeDate
}

// 获取某个日期， N 天后的日期
export function getAfterNDaysDate (startDate, n) {
  var date = new Date(startDate)
  var year, month, day, afterDate
  date.setDate(date.getDate() + n)
  year = date.getFullYear()
  month = date.getMonth() + 1
  day = date.getDate()
  afterDate = year + '-' + (month < 10 ? ('0' + month) : month) + '-' + (day < 10 ? ('0' + day) : day)
  return afterDate
}

// 得到环比日期
export function getCircleDate(start, end) {
  let newData = []
  // start = start.substr(0, 4) + '-' + start.substr(4, 2) + '-' + start.substr(6)
	// end = end.substr(0, 4) + '-' + end.substr(4, 2) + '-' + end.substr(6)
	let diffDays = (new Date(end) - new Date(start)) / (1000 * 60 * 60 * 24)
	newData = [getBeforeDate(start, diffDays + 2).replace(/-/g, ''), getBeforeDate(start, 2).replace(/-/g, '')]
  return newData
}

/**
 * 计算最近半个月，包括今天
 */
 export function getMonthDateTimeFormToday () {
  var timezone = localStorage.getItem('zoneId')
  // 根据偏移计算服务器的时间
  var timeZoneOffset = localStorage.getItem('timeZoneOffset') || 0
  var now = new Date().getTime()
  var date = now - parseInt(timeZoneOffset)
  var timeStr = moment(date).tz(timezone).format('YYYY-MM-DD')
  var initDateTimeArr = [dateTime(new Date(new Date(timeStr).getTime() - 29 * 86400000)), timeStr]
  return initDateTimeArr
}