import dayjs from 'dayjs'
import en from 'dayjs/locale/en'

export default function toDayMonth(dateLike?: string | number | Date) {
  return dayjs(dateLike).locale(en).format('DD MMMM')
}
