import type { ErrorsOption } from '@/http'
import axios from 'axios'
import { showToast } from 'vant'

const tokenExpiredCodes = [
  // JWT_EXPIRED
  '30002',
  // JWT_INVALID
  '30003',
  // GENERATE_JWT_FAILED
  '30004',
  // USER_LOGGED_IN_ANOTHER_DEVICE
  '30006',
  // ERR_PARSING_KEY
  '30008',
  // SESSION_INVALID
  '30009',
  // ERR_SIGNING_METHOD
  '30124',
  // REFRESH_TOKEN_FAILED
  '30125',
]

export default {
  showMessage(message) {
    showToast({
      message,
      overlay: false,
    })
  },
  errors: {
    400: 'Bad Request',
    401: 'Please Log in',
    403: 'Forbidden',
    404: (respose) => `Request url not found [${respose.config?.url}]`,
    405: 'Method not allowed',
    406: 'Method not supported',
    500: 'Server inernal error,please try again later',
    /** Custom Global Error Handle */
    // GW_801104: ({ config }) => {
    //   const message =
    //     'We are sorry for the inconvenience. We are currently coordinating with your payment solution provider to resolve the issue. Thank you for your patience.'
    //
    //   Dialog.alert({
    //     message: message,
    //     confirmButtonText: 'Okay',
    //   })
    // },
    unknown(response) {
      if ('data' in response) {
        const { code, msg } = response.data
        return `${msg || 'Error'} ( ${code} )`
      }
    },
  },
  postHandle(response) {
    if (!axios.isAxiosError(response) && tokenExpiredCodes.includes(response.data.code)) {
      // TODO 处理token过期
    }
  },
  preHandle(response) {
    const { code, msg } = response.data
    if (code === 0) return true
    return `${msg || 'Error'} ( ${code} )`
  },
} as ErrorsOption
