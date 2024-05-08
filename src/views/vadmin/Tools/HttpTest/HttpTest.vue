<script setup lang="tsx">
import { Form, FormSchema } from '@/components/Form'
import { reactive, ref, unref, onMounted } from 'vue'
import { ElInput, ElContainer, ElAside, ElMain, ElHeader, ElTree, ElButton, ElDialog, ElTable, ElTableColumn, ElScrollbar, ElSelect, ElOption } from 'element-plus'
import { ContentWrap } from '@/components/ContentWrap'
import { useI18n } from '@/hooks/web/useI18n'
import { Icon } from '@/components/Icon'

const { t } = useI18n()

// 数据源表单
const selectSource = reactive<FormSchema[]>([
    {
        label: '要请求的url',
        component: 'Select',

        componentProps: {
            slots: {
                prepend: () => <Icon icon="ep:calendar" />,
                append: () => <Icon icon="ep:share" />
            }
        }
    },
    {
        label: '要请求的url',
        component: 'Input',
        componentProps: {
            slots: {
                prepend: () => <Icon icon="ep:calendar" />,
            }
        }
    }
])

</script>

<template>
    <ContentWrap>
        <div style="margin-top: 15px">
            <ElInput placeholder="请输入内容" v-model="input3" class="input-with-select">
                <template #prepend>
                    <ElSelect v-model="select" placeholder="请选择">
                        <ElOption label="餐厅名" value="1" />
                        <ElOption label="订单号" value="2" />
                        <ElOption label="用户电话" value="3" />
                    </ElSelect>
                </template>
                <template #append>
                    <ElButton icon="el-icon-search" />
                </template>
            </ElInput>
        </div>
    </ContentWrap>
</template>
