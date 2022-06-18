// 扫码创建
export interface QRCodeCreateRequest {
  device_seed: number;
  protocol: number;
}

export interface QRCodeCreateResponse {
  sig: string;
  image: string;
}export {}
