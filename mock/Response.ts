interface Head {
    cost: number
    errCode: string
    errMsg: string
}

export default class Response<T = any> {
    constructor(
        public code: number,
        public message: string,
        public body: T,
        public head: Head,
    ) {
    }

    static OK<T>(body: T) {
        return new Response<T>(200, null, body, {
            cost: 0, errCode: "0000", errMsg: "successful operation"
        })
    }

    static throw(code: number)
    static throw(message: string)
    static throw(code: number, message: string)
    static throw(code: any, message?: any) {
        message ||= typeof code === 'string' ? code : null
        code = typeof code === 'string' ? -1 : code
        return new Response(code, message, null, {
            cost: 0, errCode: "0000", errMsg: "successful operation"
        })
    }
}
