<script setup lang="tsx">
import { Form, FormSchema } from '@/components/Form'
import { reactive, ref, unref } from 'vue'
import { ElContainer, ElAside, ElMain, ElHeader, ElTree, ElButton } from 'element-plus'
import type Node from 'element-plus/es/components/tree/src/model/node'
import { ContentWrap } from '@/components/ContentWrap'
import { getDbListApi, getTableListApi, mysqlExecuteApi } from '@/api/vadmin/tools/querydb'
import { getDataSourceListApi } from '@/api/vadmin/deploy/data'
import { BaseButton } from '@/components/Button'

const dialogVisible = ref(false)
const dialogTitle = ref('')
const currentRow = ref({})
const actionType = ref('')

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

// 编辑方法
const editAction = async (row: any) => {
    const res = await getProjectListApi(row.id)
    if (res) {
        dialogTitle.value = '编辑项目'
        actionType.value = 'edit'
        currentRow.value = row
        dialogVisible.value = true
    }
}
const currentDb = ref(''); // 使用ref
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
                width: '200px'
            },
            props: {
                label: 'data_name',
                value: 'id'
            },
            on: {
                change: (e) => {
                    const res = selectOptions.value.find(item => item.id == e);
                    console.log(res);
                }
            }
        },
        // 下拉选择数据源
        optionApi: async () => {
            const res = await getDataSourceListApi()
            selectOptions.value = res.data;
            return res.data
        }
    },
    {
        slots: {
            default: (data: any) => {
                const row = data.row
                const add = ['auth.user.cereate'] // 编辑权限控制
                return (
                    <>
                        <BaseButton
                            size="small"
                            v-hasPermi={add} // 检查更新权限
                            onClick={() => addSource(row)}
                        >
                            新增
                        </BaseButton>
                    </>
                )
            }
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
    <ContentWrap class="dbTreeForDbQuery">
        <div class="wrapper-op">
            <Form :schema="formSchema" />
            <ElRow :gutter="10">
                <ElCol :span="1.5" v-hasPermi="['auth.user.create']">
                    <BaseButton type="primary" @click="addSource">
                        <Icon icon="icon-park-outline:add-one" />新增
                    </BaseButton>
                </ElCol>
            </ElRow>
        </div>
        <div class="tree-current-node">
            <span>当前库:</span>
        </div>
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


<style lang="less" scoped>
.dbTreeForDbQuery {
    padding: 0 6px;
    width: 100%;
    overflow-x: auto;
    overflow-y: hidden;
    height: 100%;

    .wrapper-op {
        min-width: 220px;
        margin-bottom: 8px;
        display: flex;
        align-items: stretch;
    }

    .tree-current-node {
        padding: 0 0 8px 6px;
        border-bottom: 1px solid #dee2ea;
        margin-bottom: 6px;

        span {
            color: #2c2f37;
            font-weight: 600;
            font-size: 12px
        }
    }

    .tree-database-list {
        height: calc(100% - 70px);
        overflow-y: auto;
    }
}
</style>