import request from '@/config/axios'
import type { ProjectType } from './type'


export const getProjectList = (params: ProjectType): Promise<IResponse> => {
    return request.get({ url: '/vadmin/autotest/project/getprojectlist', params })
}

export const createProject = (data: any): Promise<IResponse> => {
    return request.post({ url: '/vadmin/autotest/project/createproject', data })
}
