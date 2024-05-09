<script setup lang="tsx">
import { ContentWrap } from '@/components/ContentWrap'
import { nextTick, onMounted, reactive, ref } from 'vue'
import { ElCard, ElInput, ElSelect, ElOption, ElButton } from 'element-plus'

let url = ref('')
let select = ref('')
const state = reactive({
    methodList: [
        { label: 'POST', value: '1', color: 'rgb(73, 204, 144)', fontWeight: 600 },
        { label: 'GET', value: '2', color: 'rgb(97, 175, 254)', fontWeight: 600 },
        { label: 'PUT', value: '3', color: 'rgb(252, 161, 48)', fontWeight: 600 },
        { label: 'DELETE', value: '4', color: 'rgb(249, 62, 61)', fontWeight: 600 },
    ]
})
</script>

<template>
    <ContentWrap class="el-card__body">
        <ElCard class="h100" shadow="always">
            <ElCard class="api-case" shadow="always">
                <div class="input-button-container">
                    <ElInput v-model="url" placeholder="输入 http 或 https 起始的完整 URL">
                        <template #prepend>
                            <ElSelect v-model="select" placeholder="GET" style="width: 115px">
                                <ElOption
v-for="method in state.methodList" :key="method.value" :label="method.label"
                                    :value="method.value"
                                    :style="{ color: method.color, fontWeight: method.fontWeight }">
                                    <span :style="{ color: select === method.value ? method.color : '' }">{{ method.label
                                        }}</span>
                                </ElOption>
                            </ElSelect>
                        </template>
                    </ElInput>
                    <div style="display: flex; padding: 10px;">
                        <ElButton type="primary">保存</ElButton>
                        <ElButton type="success">调试</ElButton>
                        <ElButton type="warning">刷新</ElButton>
                    </div>
                </div>
            </ElCard>
        </ElCard>
    </ContentWrap>
</template>


<style lang="less" scoped>
.el-card__body {
    padding: var(--el-card-padding);
}

.h100 {
    height: 100% !important;
}

.api-case {
    padding: 15px 16px;
    background-color: #fff;
    border-radius: 10px;
    border-left: 5px solid #409eff;
    margin-bottom: 20px;
    box-shadow: 0 0 12px #0000001f;
}

.input-button-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    /* 添加这一行可以垂直居中对齐 */
}

/* 自定义 Select 组件样式 */
.el-select .el-input .el-input__inner {
    color: #606266;
    /* 默认文本颜色 */
}
</style>