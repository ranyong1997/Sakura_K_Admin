import request from '@/config/axios'


// 获取数据库中的所有库
export const getDbListApi = (params: any): Promise<IResponse> => {
    return request.post({url: '/vadmin/autotest/datasource/dbList', params})
}


// 获取指定数据库中的所有表名
export const getTableListApi = (params: any): Promise<IResponse> => {
    return request.post({url: '/vadmin/autotest/datasource/tableList', params})
}


// 在指定的数据库中执行 SQL 查询语句
export const mysqlExecuteApi = (data: any): Promise<IResponse> => {
    return request.post({url: '/vadmin/autotest/datasource/mysqlexecute', data})
}