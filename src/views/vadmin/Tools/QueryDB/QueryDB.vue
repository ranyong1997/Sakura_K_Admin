<script setup lang="tsx">
import { Form, FormSchema } from '@/components/Form'
import { reactive, ref } from 'vue'
import { ElContainer, ElAside, ElMain, ElHeader, ElTree, ElButton, ElDialog, ElTable, ElTableColumn, ElScrollbar } from 'element-plus'
import type Node from 'element-plus/es/components/tree/src/model/node'
import { ContentWrap } from '@/components/ContentWrap'
import { getDbListApi, getTableListApi, mysqlExecuteApi } from '@/api/vadmin/tools/querydb'
import { getDataSourceListApi } from '@/api/vadmin/deploy/data'
import { BaseButton } from '@/components/Button'




// Table 表格假数据
const tableData = [
    {
        date: '2016-05-03',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-02',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    }
]
// 下拉选择数据源
let selectOptions = ref([])
// 当前库
let currentLib = ref('')
// 当前表
let currentTab = ref('')
// 数据源表单
// source_id 其他请求也需要
let source_id = ref();
// 定义一个变量 存储初始化的树结构
let oriTreeData = ref([]);
const selectSource = reactive<FormSchema[]>([
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
                change: async (e) => {
                    const res = selectOptions.value.find(item => item.id == e)
                    // 渲染当前库名
                    currentLib.value = res.data_name
                    source_id.value = res.id;
                    oriTreeData.value = [];
                    // 每次选择数据源发起请求
                    let result = await getDbListApi({ source_id: res.id })
                    // 初始化组织树结构
                    if (Array.isArray(result.data.databases)) {
                        for (let item of result.data.databases) {
                            oriTreeData.value.push({ name: item });
                        }
                    }
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
    // 新增按钮
    {
        slots: {
            default: (data: any) => {
                const row = data.row
                const add = ['auth.user.cereate'] // 新增权限控制
                return (
                    <>
                        <BaseButton
                            size="small"
                            v-hasPermi={add} // 检查新增权限
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


// 树形结构
interface Tree {
    name: string
    leaf?: boolean
}

const props = {
    label: 'name',
    children: 'zones',
    isLeaf: 'leaf',
}

const handleNodeClick = (data: Tree) => {
    console.log(data)
}

const loadNode = (node: Node, resolve: (data: Tree[]) => void) => {

    if (node.level === 0) {
        return resolve(oriTreeData.value)
    }
    if (node.level > 1) return resolve([])

    // 构成组织树结构
    let resArr: Tree[] = [];
    // 渲染当前表名
    currentTab.value = node.data.name
    getTableListApi({ source_id: source_id.value, databases: node.data.name }).then(result => {
        if (Array.isArray(result.data.tables)) {
            for (let item of result.data.tables) {
                resArr.push({ name: item, leaf: true });
            }
        }
        resolve(resArr)
    })
}
</script>

<template>
    <ContentWrap class="dbTreeForDbQuery">
        <div class="wrapper-op">
            <!-- 数据源表单 -->
            <Form :schema="selectSource" />
            <ElRow :gutter="10">
                <ElCol :span="1.5" v-hasPermi="['auth.user.create']">
                    <BaseButton type="primary" @click="addSource">
                        <Icon icon="icon-park-outline:add-one" />新增
                    </BaseButton>
                </ElCol>
            </ElRow>
        </div>
        <div class="tree-current-node">
            <span>当前库: {{ currentLib }}</span>
            <span>当前表: {{ currentTab }}</span>
        </div>

        <ElContainer>
            <!-- 左侧 -->
            <ElAside width="400px">
                <ElTree
:data="oriTreeData" style="max-width: 600px" :props="props" :load="loadNode"
                    @node-click="handleNodeClick" lazy />
            </ElAside>
            <ElContainer>
                <!-- 右侧上半部分 -->
                <ElHeader height="400px">
                    <Monaco/>
                </ElHeader>
                <!-- 右侧下半部分 -->
                <ElMain style="height: 400px">
                    <ElScrollbar>
                        <ElTable :data="tableData" style="width: 100%">
                            <ElTableColumn prop="date" label="Date" width="180" />
                            <ElTableColumn prop="name" label="Name" width="180" />
                            <ElTableColumn prop="address" label="Address" />
                        </ElTable>
                    </ElScrollbar>
                </ElMain>
            </ElContainer>
        </ElContainer>
    </ContentWrap>
</template>


<style lang="less" scoped>
.scrollbar-demo-item {
    display: flex;
    height: 50px;
    margin: 10px;
    color: var(--el-color-primary);
    text-align: center;
    background: var(--el-color-primary-light-9);
    border-radius: 4px;
    align-items: center;
    justify-content: center;
}

.dbTreeForDbQuery {
    width: 100%;
    height: 100%;
    padding: 0 6px;
    overflow: auto hidden;

    .wrapper-op {
        display: flex;
        min-width: 220px;
        margin-bottom: 8px;
        align-items: stretch;
    }

    .tree-current-node {
        padding: 0 0 8px 6px;
        margin-top: -40px;
        margin-bottom: 6px;
        border-bottom: 1px solid #dee2ea;

        span {
            font-size: 12px;
            font-weight: 600;
            color: #2c2f37
        }
    }

    .tree-database-list {
        height: calc(100% - 70px);
        overflow-y: auto;
    }
}
</style>