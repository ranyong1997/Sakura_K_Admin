import request from '@/config/axios'


// 获取数据库中的所有库
export const getDbListApi = (data: any): Promise<IResponse> => {
    return request.post({ url: '/vadmin/autotest/datasource/dbList', data })
}


// 获取指定数据库中的所有表名
export const getTableListApi = (data: any): Promise<IResponse> => {
    return request.post({ url: '/vadmin/autotest/datasource/tableList', data })
}


// 在指定的数据库中执行 SQL 查询语句
export const mysqlExecuteApi = (data: any): Promise<IResponse> => {
    return request.post({ url: '/vadmin/autotest/datasource/mysqlexecute', data })
}