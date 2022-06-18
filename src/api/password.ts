import {get, post} from "./index";

// 密码创建
export interface PasswordCreateRequest {
  uin: number;
  password: string;
  device_seed: number;
  protocol: number;
}

// 提交滑块ticket
export interface SubmitTicketRequest {
  uin: number;
  protocol: number;
  ticket: string;
}

// 请求短信验证码
export interface RequestSmsRequest {
  uin: number;
  protocol: number;
}

// 提交短信验证码
export interface SubmitSmsRequest {
  uin: number;
  protocol: number;
  sms: string;
}


// 删除客户端
export interface PasswordDeleteClientRequest {
  uin: number;
  protocol: number;
}

// 密码登录响应
export interface LoginResponse {
  state: string;
  captcha_url?: string;
  verify_url?: string;
  sms_phone?: string;
  message?: string;
}

export interface PasswordListClientResponse {
  clients: PasswordClient[];
}

export interface PasswordClient {
  uin: number;
  protocol: number;
  resp: LoginResponse;
}

export interface BaseResponse {
}

export const passwordCreate = async (req: PasswordCreateRequest): Promise<LoginResponse> => {
  return await post("/login/password/create", req)
}

export const passwordSubmitTicket = async (req: SubmitTicketRequest): Promise<LoginResponse> => {
  return await post("/login/password/submit_ticket", req)
}

export const passwordRequestSms = async (req: RequestSmsRequest): Promise<LoginResponse> => {
  return await post("/login/password/request_sms", req)
}

export const passwordSubmitSms = async (req: SubmitSmsRequest): Promise<LoginResponse> => {
  return await post("/login/password/submit_sms", req)
}

export const passwordDeleteClient = async (req: PasswordDeleteClientRequest): Promise<BaseResponse> => {
  return await post("/login/password/delete", req)
}

export const passwordListClient = async (): Promise<PasswordListClientResponse> => {
  return await get("/login/password/list")
}
