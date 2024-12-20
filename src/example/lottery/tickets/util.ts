import { checkin, type TwoWeekList } from '@/example/apis'
import { DailyCheckIn } from '@/const/enum'
import dayjs from 'dayjs'

export function status2enum(item: TwoWeekList, index: number, todayIndex: number): DailyCheckIn {
  let status = DailyCheckIn.Unable
  if (todayIndex === -1) return status
  if (index >= todayIndex) {
    status = DailyCheckIn.Wating
  } else if (item.today) {
    todayIndex = index
    status = DailyCheckIn.Wating
  } else if (item.alreadyCheckin === 1) {
    status = DailyCheckIn.Done
  } else if (item.ableToCheckin === 1) {
    status = DailyCheckIn.Able
  }
  return status
}

export function format(item: TwoWeekList): string {
  if (item.today) return 'TODAY'
  if (item.date === '') return '-.--'
  return dayjs(item.date).format('M.DD')
}

/** 领取彩票 */
export async function claimTickets(date: string) {
  await checkin({ checkinDate: date })
}
