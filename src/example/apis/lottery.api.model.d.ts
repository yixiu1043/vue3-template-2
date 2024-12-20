export interface Base<R = unknown, Q = unknown> {
  response: R
  request: Q
}

/** 签到表查询14天响应体 */
export interface QueryUserResponse<T extends any = unknown> {
  total: number
  twoWeekList: (TwoWeekList & ({} & T))[]
}

export interface TwoWeekList {
  ableToCheckin: number
  alreadyCheckin: number
  today: boolean
  date: string
}

export declare namespace request {
  interface Checkin {
    /** notes = "簽到日期", value = "2024-04-20" */
    checkinDate: string
    /** notes = "翻牌index", value = "0,1,2")  */
    index: string
  }

  interface LuckyDrawList {
    date: string
    pageNum: number
    pageSize: number
    /** 0-每日抽奖记录，1-直播间抽奖记录 */
    winningType: 0 | 1
  }
}

export declare namespace response {
  interface Checkin {
    list: number[]
    result: LotteryTicketsDistributionResult
  }

  interface LotteryTicketsDistributionResult {
    loginName: string
    distributedQuantity: number
    lotterySource: number
  }

  interface InvitedUser {
    id: string
    inviteTo: string
    lotteryRedeemStatus: number
    registerTime: string
  }

  interface Rollover {
    userRemainSportBetAmount: number
    userTotalSportBetAmount: number
  }

  interface MyTickets {
    obtainNew: boolean
    ticketsCount: number
  }

  interface MyTickets2 {
    ticketList: TicketList
    wonList: WonList
  }

  interface TicketList {
    awaitingWinTickets: NTicket[]
    lastId: number
  }

  interface NTicket {
    createTime: string
    createUser: string
    id: number
    loginName: string
    lotteryNumber: string
    lotterySource: number
    /** "0: unactivated 1: activated 2: prize1 3: prize2 4: used 5: expired 6: abandon" */
    lotteryStatus: 1 | 2 | 3 | 4 | 5 | 6
    updateTime: string
    updateUser: string
  }

  interface WonList {
    lastId: number
    wonTickets: NTicket[]
  }

  interface Head {
    cost: number
    errCode: string
    errMsg: string
    formatData: FormatDatum[]
  }

  interface FormatDatum {}

  interface RolloverRedeem {
    loginName: string
    otherCacheAmount: number
    otherToRedeem: number
    sportCacheAmount: number
    sportToRedeem: number
    sportTickets: number
    otherTickets: number
    totalBetOther: number
    totalBetSport: number
  }

  type LuckyDrawList = Page<LuckyDrawListRecord>

  // Generated by https://quicktype.io

  interface PoolData {
    dataList: DataList[]
    totalPrice: number
  }

  interface DataList {
    afterPrice: number
    addPrice: number
    beforePrice: number
    contentText: string
    createTime: string
    createUser: string
    deleteFlag: number
    id: number
    updateTime: string
    updateUser: string
  }

  // Generated by https://quicktype.io

  interface OnGoing {
    apl: APL
    sabaMatchRsp: SabaMatchRsp
  }

  interface APL {
    aplDate: string
    aplTime: string
    id: number
  }

  interface SabaMatchRsp {
    globalShowTime: string
    leagueId: string
    leagueName: string
    matchId: string
    sportTypeId: string
    tothirdparty: string
    tothirdpartyv2: string
  }

  interface LiveLuckyDraw {
    createTime: string
    createUser: string
    id: number
    loginName: string
    lotteryNumber: string
    lotterySource: number
    lotteryStatus: number
    updateTime: string
    updateUser: string
  }

  interface RemainAmount {
    dayTotalRemainAmount: number
    userRemainAmount: number
  }

  interface CustomerPoints {
    integralBalance: number
  }
}

export interface Page<T> {
  countId: string
  current: number
  hitCount: boolean
  maxLimit: number
  optimizeCountSql: boolean
  orders: Order[]
  pages: number
  records: T[]
  searchCount: boolean
  size: number
  total: number
}
interface Order {
  asc: boolean
  column: string
}

interface LuckyDrawListRecord {
  batchNumber: number
  createTime: string
  createUser: string
  id: number
  loginName: string
  lotteryNumber: string
  prizeName: string
  updateTime: string
  updateUser: string
  winnigDate: string
  winningType: number
}

interface WonList {
  lastId: number
  wonTickets: WonTicket[]
}

interface WonTicket {
  createTime: string
  createUser: string
  id: number
  loginName: string
  lotteryNumber: string
  lotterySource: number
  lotteryStatus: number
  updateTime: string
  updateUser: string
}
