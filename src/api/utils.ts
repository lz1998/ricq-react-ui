import {LoginResponse} from "./password";

export const getAvatarUrl = (uin: number): string => {
  return `http://q2.qlogo.cn/headimg_dl?dst_uin=${uin}&spec=640`
}

export const getPasswordLoginState = (resp: LoginResponse): string => {
  switch (resp.state) {
    case "success":
      return "登录成功"
    case "need_captcha":
      return "滑块验证码"
    case "account_frozen":
      return "账号冻结"
    case "device_locked":
      return "设备锁"
    case "too_many_sms_request":
      return "短信太频繁"
    case "device_lock_login":
      return "请重试"
    default:
      return resp.message || resp.state
  }
}

export const getProtocolName = (protocol: number): string => {
  switch (protocol) {
    case 1:
      return "Phone"
    case 2:
      return "Watch"
    case 3:
      return "MacOS"
    case 4:
      return "QiDian"
    case 5:
      return "IPad"
    default:
      return "IPad"
  }
}
