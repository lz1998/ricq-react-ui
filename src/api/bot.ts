import {get, post} from "./index";

export interface ListBotResponse {
  bots: Bot[];
}

export interface Bot {
  uin: number;
  nick: string;
  status: number;
  protocol: number;
}

export interface DeleteBotRequest {
  uin: number;
  protocol: number;
}

export interface BaseResponse {
}

export const listBot = async (): Promise<ListBotResponse> => {
  return await get("/bot/list")
}

export const deleteBot = async (req: DeleteBotRequest): Promise<BaseResponse> => {
  return await post("/bot/delete", req)
}
