import request from '@/config/axios'
import type { EnvType } from './type'


// 获取环境列表
export const getEnvListApi = (params: EnvType): Promise<IResponse> => {
    return request.get({ url: '/vadmin/autotest/env/getenvlist', params })
}

// 新增环境
export const addEnvApi = (data: any): Promise<IResponse> => {
    return request.post({ url: '/vadmin/autotest/env/createenv', data })
}

// 更新环境
export const putEnvApi = (data: any): Promise<IResponse> => {
    return request.put({ url: `/vadmin/autotest/env/${data.id}`, data })
}

// 删除环境
export const delEnvApi = (data: any): Promise<IResponse> => {
    return request.delete({ url: '/vadmin/autotest/env/softdelenv', data })
}