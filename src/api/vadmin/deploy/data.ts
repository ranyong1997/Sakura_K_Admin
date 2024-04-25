import request from '@/config/axios'
import type { DataSource,DataType } from './type'


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


// 获取数据源类型列表
export const getDataTypeListApi = (params: DataType): Promise<IResponse> => {
    return request.get({ url: '/vadmin/autotest/datasource/getdatatypelist', params })
}

// 新增数据源类型
export const addDataTypeApi = (data: any): Promise<IResponse> => {
    return request.post({ url: '/vadmin/autotest/datasource/adddatatype', data })
}

// 更新数据源类型
export const putDataTypeApi = (data: any): Promise<IResponse> => {
    return request.put({ url: `/vadmin/autotest/datasource/datatype/${data.id}`, data })
}

// 删除环境
export const delDataTypeApi = (data: any): Promise<IResponse> => {
    return request.delete({ url: '/vadmin/autotest/datasource/softdeldatatype', data })
}