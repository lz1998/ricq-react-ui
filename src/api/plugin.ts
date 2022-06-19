import {get, post} from "./index";

export interface SavePluginRequest {
  name: string;
  plugin: Plugin;
}

export interface Plugin {
  disabled: boolean;
  urls: string[];
}

export interface DeletePluginRequest {
  name: string;
}

export interface BaseResponse {
}

export interface ListPluginResponse {
  plugins: Map<string, Plugin>;
}

export const pluginDelete = async (req: DeletePluginRequest): Promise<BaseResponse> => {
  return await post("/plugin/delete", req)
}

export const pluginSave = async (req: SavePluginRequest): Promise<BaseResponse> => {
  return await post("/plugin/save", req)
}

export const pluginList = async (): Promise<ListPluginResponse> => {
  return await get("/plugin/list")
}
