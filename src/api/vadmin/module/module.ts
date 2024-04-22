import request from '@/config/axios'
import type { ProjectType } from './type'

// 获取模块列表
export const getModuleListApi = (params: ProjectType): Promise<IResponse> => {
    return request.get({ url: '/vadmin/autotest/module/getmodulelist', params })
}

// 创建模块
export const addModuleApi = (data: any): Promise<IResponse> => {
    return request.post({ url: '/vadmin/autotest/module/createmodule', data })
}

// 更新模块
export const putModuleApi = (data: any): Promise<IResponse> => {
    return request.put({ url: `/vadmin/autotest/module/${data.id}`, data })
}

// 软删除模块
export const delModuleApi = (data: any): Promise<IResponse> => {
    return request.delete({ url: '/vadmin/autotest/module/softdelproject', data })
}