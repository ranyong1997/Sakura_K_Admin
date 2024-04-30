<script setup lang="tsx">
import { Form, FormSchema } from '@/components/Form'
import { useForm } from '@/hooks/web/useForm'
import { computed, onMounted, reactive, ref, unref } from 'vue'
import { useTable } from '@/hooks/web/useTable'
import { useI18n } from '@/hooks/web/useI18n'
import { Table, TableColumn } from '@/components/Table'
import { ElRow, ElCol, ElMessage, ElContainer, ElAside, ElMain, ElHeader, ElTree } from 'element-plus'
import type Node from 'element-plus/es/components/tree/src/model/node'
import { Search } from '@/components/Search'
import { ContentWrap } from '@/components/ContentWrap'
import { Dialog } from '@/components/Dialog'
import { getDbListApi, getTableListApi, mysqlExecuteApi } from '@/api/vadmin/tools/querydb'
import { getDataSourceListApi } from '@/api/vadmin/deploy/data'

import { useAuthStoreWithOut } from '@/store/modules/auth'
import { BaseButton } from '@/components/Button'
import Write from './components/Write.vue'

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
const { t } = useI18n()
const { tableRegister, tableState, tableMethods } = useTable({
    fetchDataApi: async () => {
        const { pageSize, currentPage } = tableState
        return getLists({
            page: unref(currentPage),
            limit: unref(pageSize),
            ...unref(searchParams),
        })
    },
})
const formSchema = reactive<FormSchema[]>([
    {
        field: 'type_id',
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
            }
        },
        props: {
            label: 'data_name',
            value: 'data_name'
        },
        // 下拉选择用户
        optionApi: async () => {
            const res = await getDataSourceListApi()
            console.log("res", res);
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
const { formRegister, formMethods } = useForm()
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
        <Form :rules="rules" @register="formRegister" :schema="formSchema" />
        <span>当前库:</span>
        <el-container>
            <!-- 左侧 -->
            <el-aside width="400px">
                <el-tree style="max-width: 600px" :props="props" :load="loadNode" lazy show-checkbox bag />
            </el-aside>
            <el-container>
                <!-- 右侧上半部分 -->
                <el-header height="400px">Header</el-header>
                <!-- 右侧下半部分 -->
                <el-main>Main</el-main>
            </el-container>
        </el-container>
    </ContentWrap>
</template>