import { isObject, isPlainObject, isEmpty } from 'lodash-es'
import { jsonToMap, deepObjectToMap } from '@/utils/transform-data'
import { plainToInstance } from 'class-transformer'
import { showToast } from 'vant'
import { User, NewRound } from '@/object'
import { useGameStore } from '@/stores/game.store'

const requestIdMap = new Map()

/// 存取AppId的相关信息
const putRequestId = (map: Map<String, any>) => {
  const requestId = map.get('requestId')
  const action = map.get('action')
  requestIdMap.set(requestId, action)
}

const handleMessage = (content: string) => {
  const contentMap = jsonToMap(content)
  // console.log('---contentMap--', contentMap)
  const requestId = contentMap.get('requestid')
  const code = contentMap.get('code')
  // console.log('---requestId--', requestId)
  // console.log('---code--', code)
  if (code != null) {
    if (code === 0) {
      const dataObj = contentMap.get('data')
      // console.log('---dataObj--', dataObj)
      // console.log('---dataObj--typeof', typeof dataObj)
      if (isObject(dataObj) && isPlainObject(dataObj)) {
        if (isEmpty(dataObj)) {
          // console.log('---isEmpty--')
          handleMap(requestId, {})
        } else {
          // console.log('---isNotEmpty--')
          // const dataMap = deepObjectToMap(dataObj)
          // console.log('----dataMap---', dataMap)
          handleMap(requestId, dataObj)
        }
      }
    } else {
      showToast(content)
    }
  } else {
    /// 主动推送
    const contentMap = jsonToMap(content)
    const action = contentMap.get('action')
    if (action != null) {
      const dataObj = contentMap.get('data')
      // console.log('---dataObj--', dataObj)
      // console.log('---dataObj--typeof', typeof dataObj)
      if (isObject(dataObj) && isPlainObject(dataObj)) {
        if (isEmpty(dataObj)) {
          // console.log('---isEmpty--')
          analyzeWsJson(action as string, new Map())
        } else {
          // console.log('---isNotEmpty--')
          // const dataMap = deepObjectToMap(dataObj)
          // console.log('----dataMap---', dataMap)
          analyzeWsJson(action as string, dataObj)
        }
      }
    } else {
      console.log('game-ws,协议外的数据', content)
    }
  }
}

const handleMap = (requestId: any, data: object) => {
  console.log('----handleMap----', requestId)
  if (requestId != null) {
    if (requestIdMap.has(requestId)) {
      const action = requestIdMap.get(requestId)
      analyzeWsJson(action, data)
      requestIdMap.delete(requestId)
    } else if (requestId == '0') {
      analyzeWsJson('wsInitStatus', data)
    } else {
      // throw "代码有问题";
    }
  }
}

const analyzeWsJson = async (action: string, data: object) => {
  // console.log('----analyzeWsJson----action', action)
  // console.log('----analyzeWsJson----data', data)
  if (action == 'enter_game') {
    // GameManager.shared.onGameSocketConnected()
  } else if (action == 'get_user_info') {
    const user = plainToInstance(User, data)
    console.log('---user---', user)
    const game = useGameStore()
    game.updateUser(user)
  } else if (action == 'NewRound') {
    const newRound = plainToInstance(NewRound, data)
    const game = useGameStore()
    game.updateNewRound(newRound)
    console.log('---newRound---', newRound)
  }
  // switch (action) {
  //   case 'enter_game':
  //     break
  //   case 'get_user_info':
  // UserInfoBean
  // bean = UserInfoBean.fromJson(data)
  // //余额变化
  // GameManager.shared.setBalance(bean.asset ?? ImConstants.noBalance)
  // GameManager.shared.userInfoBean = bean
  // break
  // case ImConstants.getAppUpdate:
  //   //APP狀態更新後端主動推回來的
  //   GameManager.shared.groupInfoBackEvent();
  //   break;
  // case ImConstants.getGameInfo:
  //   final games = GameManager.shared.gameNameList;
  //   for (final bean in games) {
  //   String? gameId = bean.gameId;
  //   //String iconUrl = bean.iconUrl ?? "";
  //
  //   if (gameId != null &&
  //     gameId.isNotEmpty &&
  //     !timerMgr.gameTimeInfoMap.containsKey(gameId)) {
  //     TimeInfoBean infoBean = TimeInfoBean(null, gameId);
  //     timerMgr.gameTimeInfoMap[gameId] = infoBean;
  //   }
  // }
  //   AllGameInfoBean allGameInfoBean = AllGameInfoBean.fromJson(data);
  //   List<GameInfoBean> gamesList = allGameInfoBean.games ?? [];
  //   for (GameInfoBean gameInfoBean in gamesList) {
  //   updateNewRound(gameInfoBean);
  //   //接收新的開獎紀錄通知開獎紀錄更新
  //   updateRecord(gameInfoBean);
  // }
  //   break;
  // case ImConstants.getResultBypage:
  //   OpenPrizeRecordBean openPrizeRecordBean =
  //   OpenPrizeRecordBean.fromJson(data);
  //   if (groupBottomWidgetProvider.middleWidgetType ==
  //     MiddleWidgetType.gameResultHistory) {
  //     eventBus.emit(ImConstants.getResultBypage, openPrizeRecordBean);
  //   } else {
  //     eventBus.emit(ImConstants.getRoadResult, openPrizeRecordBean);
  //   }
  //   break;
  // case ImConstants.getBettingRecordBypage:
  //   BetRecordBean betRecordBean = BetRecordBean.fromJson(data);
  //   eventBus.emit(ImConstants.getBettingRecordBypage, betRecordBean);
  //   break;
  // case ImConstants.getBettingItems:
  //   BetInfoItemsBean bettingItems = BetInfoItemsBean.fromJson(data);
  //   String appId = GameManager.shared.currentGameId;
  //
  //   /// 存一份到内存中
  //   GameManager.shared.gameInfoMap[appId] = bettingItems;
  //   gameManager.saveCurrentIdItems(appId, bettingItems);
  //   String str = jsonEncode(data);
  //
  //   ///存储面板信息 到缓存  key: 游戏ID，面板json.
  //   await dataCenter.setConfig(appId, str);
  //   await betModel.reorganizeCacheDataHandler();
  //   // betModel.needResetTabController.value = true;
  //   ///通知刷新遊戲鍵盤tab
  //   eventBus.emit(ImConstants.switchGameKeyboard, true);
  //
  //   ///通知刷新當前是否可以投注
  //   eventBus.emit(ImConstants.refreshCanBet, true);
  //   break;
  // case ImConstants.normalBet:
  //   BettingResponseBean bettingResponseBean =
  //   BettingResponseBean.fromJson(data);
  //   String str = jsonEncode(data);
  //   debugPrint("投注结果:$str");
  //
  //   /// 分割成功失败数据
  //   List<Result>? resultSuc = [];
  //   List<Result>? resultFail = [];
  //   for (Result result in bettingResponseBean.result ?? []) {
  //   if (result.code == 0) {
  //     resultSuc.add(result);
  //   } else {
  //     resultFail.add(result);
  //   }
  // }
  //
  //   /// 转换成功信息提交给im
  //   BettingResponseBean betResultBean = BettingResponseBean(
  //   result: resultSuc,
  //   asset: bettingResponseBean.asset,
  // );
  //   Map<String, dynamic> betData = betResultBean.toJson();
  //
  //   Game? gameInfo = GameManager.shared.getCurrentGameInfo();
  //   if (gameInfo != null) {
  //     //只有開啟通知情況下才可以推送投注消息
  //     sendDataToIm(betData, resultSuc, resultFail);
  //   }
  //   //余额变化
  //   if ((bettingResponseBean.asset ?? "").isNotEmpty) {
  //     GameManager.shared
  //       .setBalance(bettingResponseBean.asset ?? ImConstants.noBalance);
  //   }
  //
  //   /// 清空所有的投注内容
  //   clearLastGameInfo();
  //   GameManager.shared.didBetSuccess();
  //   // showToast("下注成功");
  //   // onShowToast('投注成功', type: ToastType.info);
  //   // ///请求刷新余额
  //   // wsRequestUserAsset();
  //   //強制刷新投注紀錄
  //   eventBus.emit(ImConstants.initGameBetsList, true);
  //   break;
  // case ImConstants.getUserAsset:
  //   GameBalanceBean balanceBean = GameBalanceBean.fromJson(data);
  //   //余额变化
  //   GameManager.shared.setBalance(balanceBean.asset ?? ImConstants.noBalance);
  //   // showToast("刷新成功");
  //   break;
  // case ImConstants.wsInitStatus: //game-ws,建立成功状态
  //   /// 如果ws 建立成功后，再发接口请求
  //   sendWsInterfaceRequest(data);
  //   break;
  // case 'NewRound': //主动推的最新倒计时相关数据
  //
  //   break
  // case ImConstants.getWinnerList: //游戏中奖推送
  //   GameMessageHandle.gameMessageSend(20003, msgMap: data);
  //   break;
  // case ImConstants.getBetList: //游戏投注推送
  //   GameMessageHandle.gameMessageSend(20005, msgMap: data);
  //   break;
  // }
}

export { handleMessage, putRequestId }
