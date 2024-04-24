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