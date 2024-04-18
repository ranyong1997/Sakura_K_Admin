import request from '@/config/axios'
import type { RedbookType } from './type'


// 获取小红书无水印文件,支持单个下载
export const getRedbookResourceApi = (params: RedbookType): Promise<IResponse> => {
    return request.get({ url: '/vadmin/redbook/redbookdown', params })
}

// 获取小红书无水印文件,支持批量下载
export const batchgetRedbookResourceApi = (params: RedbookType): Promise<IResponse> => {
    return request.get({ url: '/vadmin/redbook/redbookdownmultiple', params })
}

// 获取小红书素材列表
export const getRedbookApi = (params: RedbookType): Promise<IResponse> => {
    return request.get({ url: '/vadmin/redbook/getredbook', params })
}
