import request from '@/config/axios'
import type { DataSource } from './type'


// 获取数据源列表
export const getDataSourceListApi = (params: DataSource): Promise<IResponse> => {
    return request.get({ url: '/vadmin/autotest/datasource/getdatasourcelist', params })
}

// 新增数据源
export const addDataSourceApi = (data: any): Promise<IResponse> => {
    return request.post({ url: '/vadmin/autotest/datasource/adddatasource', data })
}

// 更新数据源
export const putDataSourceApi = (data: any): Promise<IResponse> => {
    return request.put({ url: `/vadmin/autotest/datasource/${data.id}`, data })
}

// 删除环境
export const delDataSourceApi = (data: any): Promise<IResponse> => {
    return request.delete({ url: '/vadmin/autotest/datasource/softdeldatasource', data })
}

// 测试连接
export const testconnectSourceApi = (data: any): Promise<IResponse> => {
    return request.post({ url: '/vadmin/autotest/datasource/testconnect', data })
}