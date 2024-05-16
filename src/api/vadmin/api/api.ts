import request from '@/config/axios'
import type { ApiType } from './type'

// 获取接口信息详情
export const getApiListApi = (params: ApiType): Promise<IResponse> => {
    return request.get({ url: '/vadmin/autotest/apinfo/apilist', params })
}
// 新增接口
export const addApi = (data: any): Promise<IResponse> => {
    return request.post({ url: '/vadmin/autotest/apinfo/addapi', data })
}
// 更新接口
export const putApi = (data: any): Promise<IResponse> => {
    return request.put({ url: `/vadmin/autotest/apinfo/${data.id}`, data })
}
// 删除接口
export const delApi = (data: any): Promise<IResponse> => {
    return request.delete({ url: '/vadmin/autotest/apinfo/softdelapi', data })
}