import { Polling, post, get } from './http'
import type { KiwiResponse, KiwiRequest } from '@/model'

/** 常规用法 */
// export const liveLuckyDraw = post<response.LiveLuckyDraw>('/integralLottery/liveLuckyDraw', {
//   timeout: 15 * 10, // 超时时间
//   retryLimit: 2, // 重试次数
//   loading: false, // 是否loading，默认不loading
//   silent: true, // 是否抛出错误toast提示，，默认不提示
// })
//
// /** 分页用法 */
// export const queryLuckyDrawList = post<response.LuckyDrawList, request.LuckyDrawList>(
//   '/integralLottery/queryLuckyDrawList',
// )
//
// /** 定时请求 */
// export const queryActivatedCount = post<number>('/integralLottery/queryActivatedCount')
// /** 定时请求 */
// export const pollingActivatedCount = new Polling(queryActivatedCount, {
//   interval: 10 * 60 * 1000,
//   retry: Number.MAX_SAFE_INTEGER,
// })

export const findMiniApp = post<any, any>('/openapi/client/miniapp/find')

export const getAppConfig = get<KiwiResponse, KiwiRequest>('/app/api/account/get_app_config')
