// 定义一个字面量联合类型来表示合法的优先级值
type ValidPriority = 1 | 2 | 3 | 4

// 定义一个验证函数
function validatePriority (value: number): ValidPriority {
    if (value < 1 || value > 4) {
        throw new Error("priority必须在1到4之间");
    }
    return value as ValidPriority;
}

export type ModuleType = {
    module_name: string
    id: number
    test_user: string
    leader_user: string
    priority: ValidPriority
    project_id: number
    // 为可选属性添加 undefined 类型
    simple_desc?: string | undefined
    remarks?: string | undefined
    create_user_id: number
    page: number
    limit: number
    v_order_field: string
    v_order: string
}