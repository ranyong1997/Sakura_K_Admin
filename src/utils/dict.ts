/*
 * @Descripttion: 
 * @version: 
 * @Author: 冉勇
 * @Date: 2024-01-26 23:15:16
 * @LastEditTime: 2024-01-28 17:10:50
 */
/**
 * 回显数据字典
 *
 * @param   Recordable[] datas   数据集
 * @param   String       value   数据值
 * @return  string
 */
export interface DictDetail {
  label: string
  value: string
  disabled?: boolean
  is_default?: boolean
}

export const selectDictLabel = (datas: DictDetail[], value: string) => {
  if (!value) {
    return ''
  } else {
    const result = datas.find((item) => item.value === value)?.label
    if (result === undefined) {
      return '获取失败'
    } else {
      return result
    }
  }
}
