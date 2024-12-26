import { post } from '@/apis/http'
import type { GroupGameRequest, GroupGameResponse } from '@/model'

/** 获取游戏服ws */
export const fetchGroupGames = post<GroupGameResponse, GroupGameRequest>(
  '/beauty/sunday/group/get_group_game',
  {
    params: { token: localStorage.getItem('TOKEN') },
  },
)