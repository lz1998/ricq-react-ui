import axios, {AxiosInstance,} from 'axios'

// TODO update baseUrl
const httpClient: AxiosInstance = axios.create({
  // baseURL: "http://localhost:9000/"
})

export const post = async <Req, Resp>(url: string, req: Req): Promise<Resp> => {
  let axiosResponse = await httpClient.post(url, req)
  if (axiosResponse.status !== 200) {
    throw new Error(`status ${axiosResponse.status}`)
  }
  return axiosResponse.data
}


export const get = async <Resp>(url: string, params?: any): Promise<Resp> => {
  let axiosResponse = await httpClient.get(url, {
    params
  })
  if (axiosResponse.status !== 200) {
    throw new Error(`status ${axiosResponse.status}`)
  }
  return axiosResponse.data
}


