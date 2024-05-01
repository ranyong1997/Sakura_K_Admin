<script setup lang="tsx">
import { Form, FormSchema } from '@/components/Form'
import { reactive, ref, unref, onMounted } from 'vue'
import { ElContainer, ElAside, ElMain, ElHeader, ElTree, ElButton, ElDialog } from 'element-plus'
import type Node from 'element-plus/es/components/tree/src/model/node'
import { ContentWrap } from '@/components/ContentWrap'
import { getDbListApi, getTableListApi, mysqlExecuteApi } from '@/api/vadmin/tools/querydb'
import { getDataSourceListApi } from '@/api/vadmin/deploy/data'
import { BaseButton } from '@/components/Button'
import * as monaco from 'monaco-editor'
import type { editor } from 'monaco-editor'


let monacoEditor: editor.IStandaloneCodeEditor

const monacoContainer = ref<HTMLElement | null>(null)

onMounted(() => {
    monacoEditor = monaco.editor.create(monacoContainer.value!, {
        value: 'select  * from ',
        language: 'SQL',
        theme: 'vs'
    })
})


// 下拉选择数据源
let selectOptions = ref([])

// 数据源表单
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
onMounted(async () => {

})

</script>

<template>
    <ContentWrap class="dbTreeForDbQuery">
        <div class="wrapper-op">
            <!-- 数据源表单 -->
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
                <ElHeader height="400px">
                    <div ref="monacoContainer" style="height: 500px"></div>
                </ElHeader>
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