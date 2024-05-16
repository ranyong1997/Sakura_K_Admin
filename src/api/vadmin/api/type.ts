export type ApiType = {
    api_name: string;
    project_id: number;
    module_id: number;
    status: number;
    priority: number;
    method: string;
    tags: string[];
    url: string;
    description: string;
    request: {
        url: string;
        data: string;
        method: string;
        headers: any[];
        data_type: string;
    };
    variables: any[];
    validators: any[];
    extracts: any[];
    setup_hooks: any[];
    teardown_hooks: any[];
    create_user_id: number;
    id?: number;
    page?: number;
    limit?: number;
    v_order_field?: string;
    v_order?: string;
};