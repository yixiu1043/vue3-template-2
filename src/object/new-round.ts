import 'reflect-metadata'
import { Expose, Type } from 'class-transformer'

export class NewRound {
  appid: string = ''
  @Type(() => Current)
  current: Current = new Current()
  @Expose({ name: 'game_id' })
  gameId: string = ''
  @Expose({ name: 'game_name' })
  gameName: string = ''
  @Type(() => Last)
  last: Last = new Last()
}

export class Current {
  @Expose({ name: 'closure_time' })
  closureTime: number = 0
  @Expose({ name: 'draw_time' })
  drawTime: number = 0
  round: string = ''
  @Expose({ name: 'server_time' })
  serverTime: number = 0
  @Expose({ name: 'simple_round' })
  simpleRound: string = ''
  @Expose({ name: 'start_time' })
  startTime: number = 0
}

export class Last {
  @Expose({ name: 'main_result' })
  mainResult: string[] = []
  @Type(() => Result)
  result: Result[] = []
  round: string = ''
  @Expose({ name: 'simple_round' })
  simpleRound: string = ''
}

export class Result {
  value: string = ''
}
