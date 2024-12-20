// Generated by https://quicktype.io

export interface DomainCachedData {
    user:         User;
    news:         News;
    language:     Language;
    gameUrl:      string;
    faceid:       boolean;
    global:       Glo;
    billDetail:   GpoOrder;
    recordDetail: GpoOrder;
    GPOOrder:     GpoOrder;
    loginStore:   LoginStore;
}

export interface GpoOrder {
}

export interface Glo {
    startPageShow:  boolean;
    messageBoxShow: boolean;
    info:      any[];
}

export interface Language {
    language: string;
}

export interface LoginStore {
    lastAction: null;
    lastUser:   null;
}

export interface MayaApplet {
    sessionId:          null;
    isFirstDeposit:     null;
    firstDepositBanner: boolean;
    mayaUserInfo:       GpoOrder;
}

export interface News {
    activeIndex: number;
}

export interface User {
    webToken:  WebToken;
    userInfo:  UserInfo;
    pay:       Pay;
    banksList: any[];
    face:      null;
    productId: string;
}

export interface Pay {
    balance:           number;
    balanceFlag:       null;
    minWithdrawAmount: number;
    maxWithdrawAmount: number;
}

export interface UserInfo {
    isVisitor:         boolean;
    avatar:            string;
    bindFlag:          boolean;
    createdDate:       string;
    currency:          string;
    customerId:        string;
    customerType:      number;
    face:              boolean;
    firstDepositDate:  string;
    flag:              string;
    fromType:          string;
    gameLimit:         boolean;
    login:             boolean;
    loginName:         string;
    noLoginDays:       number;
    onlineBet:         boolean;
    parentId:          string;
    password:          string;
    productId:         string;
    starLevel:         number;
    toType:            string;
    verifyLoginIp:     boolean;
    activation:        boolean;
    agentFlag:         boolean;
    birthday:          string;
    blackFlag:         number;
    branchAddress:     string;
    branchCode:        string;
    branchName:        string;
    branchPhone:       string;
    cashCredit:        number;
    city:              string;
    customerLevel:     number;
    firstDepositFlag:  boolean;
    firstIdStatus:     string;
    firstName:         string;
    gameCredit:        number;
    gender:            string;
    glife:             boolean;
    headShot:          string;
    isLazada:          boolean;
    lastName:          string;
    loginNameFlag:     number;
    loginPwdFlag:      boolean;
    marginSwitch:      boolean;
    mayaFlag:          boolean;
    nationality:       string;
    newWalletFlag:     number;
    oddsType:          number;
    product:           number;
    registDate:        string;
    registerMethod:    string;
    silentPhotoSwitch: boolean;
    whiteListUser:     boolean;
    withdrewPwd:       boolean;
    missNum:           number;
}

export interface WebToken {
    deviceId: string;
    u2token:  string;
    token:    string;
}