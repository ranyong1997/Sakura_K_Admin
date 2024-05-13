import request from '@/config/axios'


// Http请求
export const Http = (data: any): Promise<IResponse> => {
    return request.post({url: '/vadmin/autotest/apinfo/http', data})
}
// 上传文件
export const Upload = (data: any): Promise<IResponse> => {
    return request.post({url: 'vadmin/system/upload/file/local', data})
}
