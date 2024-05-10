<script setup lang="tsx">
import { ContentWrap } from '@/components/ContentWrap'
import { Http } from '@/api/vadmin/tools/httptest'
import { reactive, ref } from 'vue'
import { ElCard, ElInput, ElSelect, ElOption, ElButton, ElTabs, ElTabPane } from 'element-plus'
import httpTable from './components/httpTable.vue';


let url = ref('')
let select = ref('GET')
const state = reactive({
    methodList: [
        { label: 'POST', value: 'POST', color: 'rgb(73, 204, 144)', fontWeight: 600 },
        { label: 'GET', value: 'GET', color: 'rgb(97, 175, 254)', fontWeight: 600 },
        { label: 'PUT', value: 'PUT', color: 'rgb(252, 161, 48)', fontWeight: 600 },
        { label: 'DELETE', value: 'DELETE', color: 'rgb(249, 62, 61)', fontWeight: 600 },
    ]
})
// 下拉框选中样式
let selectClass = ref('get');
const changeClass = (e) => {
    switch (e) {
        case 'POST': selectClass.value = 'post'; break;
        case 'GET': selectClass.value = 'get'; break;
        case 'PUT': selectClass.value = 'put'; break;
        case 'DELETE': selectClass.value = 'delete'; break;
    }
}

// Query 参数
let params = ref();
const setParams = e => {
    params.value = e;
}

// Body
// Headers
let headers = ref();
const setHeaders = e => {
    headers.value = e;
}

// Body
let body = ref();
const setBody = e => {
    body.value = e;
}

// tab
const activeName = ref('first')

// 发送请求
const send = () => {
    Http({
        "method": select.value,
        "url": url.value,
        "body": JSON.stringify(params.value),
        "body_type": 0,
        "headers": headers.value
    })
}
// 刷新
const clear = () => {
    console.log('刷新按钮');
}
</script>

<template>
    <ContentWrap class="el-card__body">
        <ElCard class="h100" shadow="always">
            <ElCard class="api-case" shadow="always">
                <div class="input-button-container">
                    <ElInput v-model="url" class="my-input" placeholder="输入 http 或 https 起始的完整 URL">
                        <template #prepend>
                            <ElSelect v-model="select" placeholder="GET" style="width: 115px" class="my-select"
                                @change="changeClass" :class="selectClass">
                                <ElOption v-for="method in state.methodList" :key="method.value" :label="method.label"
                                    :value="method.value" :style="{ color: method.color, fontWeight: method.fontWeight }">
                                    <span :style="{ color: select === method.value ? method.color : '' }">{{
                                        method.label
                                    }}</span>
                                </ElOption>
                            </ElSelect>
                        </template>
                    </ElInput>
                    <div style="display: flex; padding: 10px;">
                        <ElButton type="primary" @click="send">发送</ElButton>
                        <ElButton type="warning" @click="clear">刷新</ElButton>
                    </div>
                </div>
                <el-tabs v-model="activeName" class="demo-tabs">
                    <el-tab-pane label="Params" name="first">
                        <div>Query 参数</div>
                        <httpTable @change="setParams" />
                    </el-tab-pane>
                    <el-tab-pane label="Body" name="second">Body</el-tab-pane>
                    <el-tab-pane label="Headers" name="third">Headers</el-tab-pane>
                </el-tabs>
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
    /* 默认文本颜色 */
    color: #fff;

}

// 下拉框的样式
/deep/.my-select {
    .el-select__wrapper.el-tooltip__trigger.el-tooltip__trigger {
        background: #fff;
    }

    .el-select__selected-item span {
        font-weight: bold;
    }
}

/deep/.my-input {

    .el-input__inner {
        font-weight: bold;
    }
}

/deep/.get {
    .el-select__selected-item span {
        color: rgb(97, 175, 254);
    }
}

/deep/.post {
    .el-select__selected-item span {
        color: rgb(73, 204, 144);
    }
}

/deep/.put {
    .el-select__selected-item span {
        color: rgb(252, 161, 48);
    }
}

/deep/.delete {
    .el-select__selected-item span {
        color: rgb(249, 62, 61);
    }
}
</style>