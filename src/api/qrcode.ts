// 扫码创建
import {get, post} from "./index";

// 扫码创建
export interface QRCodeCreateRequest {
  device_seed: number;
  protocol: number;
}

export interface QRCodeCreateResponse {
  sig: string;
  image: string;
}

// 查询状态
export interface QRCodeQueryRequest {
  sig: string;
}

export interface QRCodeQueryResponse {
  state: string;
}

// 删除
export interface QRCodeDeleteRequest {
  sig: string;
}

export interface BaseResponse {
}

export interface QRCodeListResponse {
  clients: QRCodeClient[];
}

export interface QRCodeClient {
  sig: string;
  image: string;
  protocol: number;
  state: string;
}

export const qrcodeCreate = async (req: QRCodeCreateRequest): Promise<QRCodeCreateResponse> => {
  return await post("/login/qrcode/create", req)
}
export const qrcodeQuery = async (req: QRCodeQueryRequest): Promise<QRCodeQueryResponse> => {
  return await post("/login/qrcode/query", req)
}
export const qrcodeDelete = async (req: QRCodeDeleteRequest): Promise<BaseResponse> => {
  return await post("/login/qrcode/delete", req)
}
export const qrcodeListClient = async (): Promise<QRCodeListResponse> => {
  return await get("/login/qrcode/list")
}
