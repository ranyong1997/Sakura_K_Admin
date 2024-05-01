<script setup lang="tsx">
import { Form, FormSchema } from '@/components/Form'
import { reactive, ref, unref } from 'vue'
import { ElContainer, ElAside, ElMain, ElHeader, ElTree } from 'element-plus'
import type Node from 'element-plus/es/components/tree/src/model/node'
import { ContentWrap } from '@/components/ContentWrap'
import { getDbListApi, getTableListApi, mysqlExecuteApi } from '@/api/vadmin/tools/querydb'
import { getDataSourceListApi } from '@/api/vadmin/deploy/data'

// 获取数据
const getLists = async (data: any) => {
    const { pageSize, currentPage } = tableState
    const res = await getDataSourceListApi({
        page: unref(currentPage),
        limit: unref(pageSize),
        ...unref(searchParams)
    })
    res.data = res.data.map((item) => {
        return item
    })
    return {
        list: res.data || [],
        total: res.count || 0
    }
}
let selectOptions = ref([])
const formSchema = reactive<FormSchema[]>([
    {
        field: 'data_name',
        label: '数据源',
        colProps: {
            span: 24
        },
        component: 'Select',
        clearable: true,
        filterable: true,
        reserveKeyword: true,
        componentProps: {
            style: {
                width: '10%'
            },
            props: {
                label: 'data_name',
                value: 'id'
            },
            on: {
                change: (e) => {
                    let res = selectOptions.value.find(item => item.id == e);
                    console.log(res);
                }
            },
        },
        // 下拉选择用户
        optionApi: async () => {
            const res = await getDataSourceListApi()
            selectOptions.value = res.data;
            return res.data
        }
    }
])
const searchParams = ref({})
interface Tree {
    name: string
    leaf?: boolean
}

const props = {
    label: 'name',
    children: 'zones',
    isLeaf: 'leaf',
}

const loadNode = (node: Node, resolve: (data: Tree[]) => void) => {
    if (node.level === 0) {
        return resolve([{ name: 'region' }])
    }
    if (node.level > 1) return resolve([])

    setTimeout(() => {
        const data: Tree[] = [
            {
                name: 'leaf',
                leaf: true,
            },
            {
                name: 'zone',
            },
        ]
        resolve(data)
    }, 500)
}
</script>

<template>
    <ContentWrap>
        <Form :schema="formSchema" />
        <span>当前库:</span>
        <ElContainer>
            <!-- 左侧 -->
            <ElAside width="400px">
                <ElTree style="max-width: 600px" :props="props" :load="loadNode" lazy show-checkbox bag />
            </ElAside>
            <ElContainer>
                <!-- 右侧上半部分 -->
                <ElHeader height="400px">Header</ElHeader>
                <!-- 右侧下半部分 -->
                <ElMain>Main</ElMain>
            </ElContainer>
        </ElContainer>
    </ContentWrap>
</template>