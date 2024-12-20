// test.ts

import {
  MockMethod,
  // MockConfig,
} from 'vite-plugin-mock'
import dayjs from 'dayjs'
import isToday from 'dayjs/plugin/isToday.js'
import Response from './Response'
import { Random } from 'mockjs'
// import type { LuckyDrawListRecord } from '../src/apis'

dayjs.extend(isToday)

export default [
  {
    url: '/api/queryLuckyDrawList',
    method: 'post',
    timeout: 2000,
    response: ({ query }) => {
      // const luckyDrawList = []
      //
      // for (let i = 0; i < 20; i++) {
      //   luckyDrawList.push({
      //     batchNumber: Random.natural(),
      //     createTime: Random.datetime(),
      //     createUser: Random.name(),
      //     id: Random.natural(),
      //     loginName: Random.name(),
      //     lotteryNumber: Random.word(),
      //     prizeName: Random.paragraph(),
      //     updateTime: Random.datetime(),
      //     updateUser: Random.name(),
      //     winnigDate: Random.datetime(),
      //     winningType: Random.boolean() ? 1 : 0,
      //   })
      // }
      //
      // return Response.OK<model.response.LuckyDrawList>({
      //   countId: null,
      //   current: 1,
      //   hitCount: true,
      //   maxLimit: null,
      //   optimizeCountSql: true,
      //   orders: [],
      //   pages: 20,
      //   records: luckyDrawList,
      //   searchCount: true,
      //   size: 10,
      //   total: 200,
      // })
    },
  },
] as MockMethod[]
