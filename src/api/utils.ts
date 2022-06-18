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

export const getQRCodeState = (state: string): string => {
  switch (state) {
    case "image_fetch":
      return "成功获取二维码"
    case "waiting_for_scan":
      return "待扫码"
    case "waiting_for_confirm":
      return "待确认"
    case "timeout":
      return "超时"
    case "confirmed":
      return "已确认"
    case "canceled":
      return "已取消"
    default:
      return state
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

export const getNetworkStatus = (status: number): string => {
  switch (status) {
    case 0:
      return "unknown"
    case 1:
      return "运行中"
    case 2:
      return "已停止"
    case 3:
      return "已释放"
    case 4:
      return "网络错误"
    case 5:
      return "其他客户端踢下线"
    case 6:
      return "服务端强制下线"
    default:
      return status.toString()
  }
}
