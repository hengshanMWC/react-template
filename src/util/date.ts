import { isString } from 'lodash'
import moment from 'moment'

function createFormatDate(momentValue: DateValue, format: string) {
  let value: moment.Moment
  if (isString(momentValue)) {
    value = moment(momentValue)
  }
  else {
    value = momentValue
  }
  return value.format(format)
}
export function formatDate(momentValue: DateValue) {
  return createFormatDate(momentValue, 'YYYY-MM-DD')
}

export function formatDateTime(momentValue: DateValue) {
  return createFormatDate(momentValue, 'YYYY-MM-DD hh:mm:ss')
}
