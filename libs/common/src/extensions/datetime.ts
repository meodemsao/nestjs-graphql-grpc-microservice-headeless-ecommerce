// @ts-ignore
import moment from 'moment'

export const FORMAT_TIME_STAMP = 'YYYY-MM-DD"T"HH24:MI:SS.FF3"Z"'

export const FORMAT_DATE = 'YYYY-MM-DD'

export const FORMAT_VN_DATE = 'DD/MM/YYYY'

export const FORMAT_DATE_TIME = 'DD/MM/YYYY - HH:MM'

export const MILISECOND_PER_MINUTE = 60 * 1000

export const SubtractUnit = {
  DAYS: 'days',
  MINUTES: 'minutes'
}

export const convertMinuteToMilliSecond = (minute) => {
  if (!minute) return 0
  return Number(minute) * MILISECOND_PER_MINUTE
}

export const initNewDate = () => {
  return new Date()
}

export const subtractUnitDate = (amount) => {
  let date = initNewDate()
  return date.setDate(date.getDate() + amount)
}

export const initNewDateMoment = (currentDate?) =>
  currentDate ? moment(currentDate) : moment(new Date())


export const valueDateTime = (currentDate?) =>
  currentDate ? moment(currentDate).valueOf() : moment(new Date()).valueOf()


export const formatStringToISO = (currentDate?, formatString?) => {
  if (!currentDate) {
    return null
  }
  if (formatString) {
    return moment(currentDate, formatString).toISOString()
  }
  return moment(currentDate).toISOString()
}

export const formatDatetimeToString = (input?, formatString?) => {
  if (!input) return null
  return moment(input).format(formatString || FORMAT_DATE)
}

export const subtractUnitTime = (input?, amount?, unit?) => {
  return moment(input ? input : new Date()).subtract(amount, unit)
}

export const initStartOfDay = (currentDate?) => {
  return currentDate
    ? moment(currentDate).startOf('days')
    : moment(new Date()).startOf('days')
}

export const initEndOfDay = (currentDate?) => {
  return currentDate
    ? moment(currentDate).endOf('days')
    : moment(new Date()).endOf('days')
}


export const calculateDateDiff = (currentDate?, dateDiff?, type?) => {
  if (currentDate && dateDiff) {
    return moment(currentDate).diff(moment(dateDiff), type)
  }
  return null
}

export const checkIsFutureTimeWithNow = (currentDate) => {
  if (currentDate) {
    return checkIsFutureTime(currentDate, initNewDate())
  }
  return false
}

export const checkIsFutureTime = (currentDate, referenceDate) => {
  if (currentDate && referenceDate) {
    return moment(currentDate).isAfter(moment(referenceDate))
  }
  return false
}

export const checkIsPreviousTimeWithNow = (currentDate) => {
  if (currentDate) {
    return checkIsPreviousTime(currentDate, initNewDate())
  }
  return false
}

export const checkIsPreviousTime = (currentDate, referenceDate) => {
  if (currentDate && referenceDate) {
    return moment(currentDate).isBefore(moment(referenceDate))
  }
  return false
}

export const initFileNameWithDateTime = () => {
  const date = initNewDate()
  return `${date.getFullYear()}_${date.getMonth()}_${date.getDay()}_${date.getTime()}`
}
