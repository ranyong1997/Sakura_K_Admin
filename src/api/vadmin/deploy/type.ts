interface Header {
    key: string;
    value:string;
    remarks:string;
}

interface EnvVariable{
    key:string;
    value:string;
    remarks:string;
}

export type EnvType = {
    env_name: string;
    dns: string;
    remarks?: string | null;
    headers?: Header[];
    env_variables?: EnvVariable[];
    create_user_id: number;
    id?: number;
    page?: number;
    limit?: number;
    v_order_field?: string;
    v_order?: string;
}


export type DataSource = {
    data_name: string;
    type?: number;
    host: string;
    port?: number;
    user: string;
    password: string;
    create_user_id: number;
    id?: number;
    page?: number;
    limit?: number;
    v_order_field?: string;
    v_order?: string;
}

export type DataType = {
    type_name: string;
    type_id: number;
    create_user_id: number;
    id?: number;
    page?: number;
    limit?: number;
    v_order_field?: string;
    v_order?: string;
}