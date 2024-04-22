// 定义一个字符串验证函数
function validateString (value: string | null | undefined): string {
    if (value !== null && value !== undefined && value.length > 100) {
        throw new Error("不能超过100个字符");
    }
    return value || "";
}

// 定义一个正整数验证函数
function validatePositiveInteger (value: number): number {
    if (value <= 0) {
        throw new Error("必须为正整数");
    }
    return value;
}

export type ProjectType = {
    project_name: string;
    responsible_name: string;
    test_user: string;
    dev_user: string;
    publish_app: string;
    simple_desc?: string | null;
    remarks?: string | null;
    create_user_id: number;
    id?: number;
    page?: number;
    limit?: number;
    v_order_field?: string;
    v_order?: string;
};