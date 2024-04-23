import request from '@/config/axios'
import type { ProjectType } from './type'


export const getProjectListApi = (params: ProjectType): Promise<IResponse> => {
    return request.get({ url: '/vadmin/autotest/project/getprojectlist', params })
}

export const addProjectApi = (data: any): Promise<IResponse> => {
    return request.post({ url: '/vadmin/autotest/project/createproject', data })
}

export const putProjectApi = (data: any): Promise<IResponse> => {
    return request.put({ url: `/vadmin/autotest/project/${data.id}`, data })
}

export const delProjectApi = (data: any): Promise<IResponse> => {
    return request.delete({ url: '/vadmin/autotest/project/softdelproject', data })
}