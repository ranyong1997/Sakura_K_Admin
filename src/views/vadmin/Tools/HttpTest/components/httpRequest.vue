<script setup lang="ts" name="httpRequest">
import { ElTable, ElOption, ElIcon, ElButton, ElSelect, ElInput, ElCol, ElRadio, ElRadioGroup, ElDropdownMenu, ElDropdownItem, ElDropdown, ElRow } from 'element-plus';
import { ref, reactive } from 'vue'

const monacoEditRef = ref()
// 初始化状态
const state = reactive({
    mode: 'raw',
    language: 'JSON',
    languageList: ['JSON', 'Text'],
    popoverOpen: false,
    bodyData: [],
    rawData: "",
    paramsData: [],
    dataTypeOptions: ['string', 'int', 'float', 'boolean'],
    formData: [],
    formDatatypeOptions: ['text', 'file'],
    fileData: {},
    x_www_form_urlencoded: [],
    lang: 'json',
});

const radioChange = (value) => {
    state.mode = value
    state.popoverOpen = false
    updateContentType(value === 'none' || value === 'form_data')
}

// 处理raw 语言
const handleLanguage = (language) => {
    state.popoverOpen = !state.popoverOpen
    state.language = language
    updateContentType()
}

const emit = defineEmits(["updateContentType"])

// 删除文件处理
const deletedFile = (row, index) => {
    console.log("删除文件")
}
// 删除
const deleteXFormData = (index) => {
    state.x_www_form_urlencoded.splice(index, 1)
}
const deleteFormData = (index) => {
    state.formData.splice(index, 1)
}

// 选择文件时触发，上传文件，回写地址
const fileChange = (e, row, index) => {
    console.log("上传文件")
}

// 处理头信息
const updateContentType = (remove = false) => {
    emit('updateContentType', state.mode, state.language, remove)
}


// 初始化数据
const initData = () => {
    state.mode = "raw"
    state.language = "JSON"
    state.rawData = ""
    state.formData = []
    state.x_www_form_urlencoded = []
    state.fileData = {}
}
// 

// 初始化表单
const setData = (data) => {
    initData()
    if (!data) return
    let mode = state.mode = data.mode
    switch (mode) {
        case 'form_data':
            state.formData = data.data ? data.data : []
            break
        case 'x_www_form_urlencoded':
            state.x_www_form_urlencoded = data.data ? data.data : []
            break
        case 'raw':
            state.rawData = data.data
            state.language = data.language
            break
        case 'params':
            break
        default:
            break
    }
}

defineExpose({
    setData
})

</script>

<template>
    <div class="httpRequest">
        <ElRadioGroup size="small" v-model="state.mode" class="radio-group" @change="radioChange">
            <ElRadio label="none">none</ElRadio>
            <ElRadio label="form_data">form_data</ElRadio>
            <ElRadio label="x_www_form_urlencoded">x_www_form_urlencoded</ElRadio>
            <ElRadio label="json">json</ElRadio>
            <ElRadio label="raw">raw</ElRadio>
            <ElDropdown @command="handleLanguage" trigger="click" v-if="state.mode === 'raw'" placement="bottom-start">
                <span class="el-button--text">
                    {{ state.language }}
                    <ElIcon class="el-icon--right">
                        <arrowDown />
                    </ElIcon>
                </span>
                <template #dropdown>
                    <ElDropdownMenu style="width: 150px">
                        <ElDropdownItem v-for="language in state.languageList" :key="language" :command="language">
                            {{ language }}
                        </ElDropdownItem>
                    </ElDropdownMenu>
                </template>
            </ElDropdown>
        </ElRadioGroup>
    </div>
    <!---------------------------none------------------------------------>
    <div v-if="state.mode === 'none'"
        style="text-align: center; padding-top: 10px;     border-radius: 4px;border:1px solid rgb(230, 230, 230);height:100px;line-height:100px;">
        <span style="color: darkgray">当前请求没有请求体</span>
    </div>
    <!---------------------------form_data------------------------------------>
    <div v-if="state.mode === 'form_data'">
        <span>form_data</span>
    </div>
    <!---------------------------x-www-form-urlencoded------------------------------------>
    <div v-if="state.mode === 'x_www_form_urlencoded'">
        <span>x_www_form_urlencoded</span>
    </div>
    <!---------------------------json------------------------------------>
    <div v-if="state.mode === 'json'">
        <span>json</span>
    </div>
    <!---------------------------raw------------------------------------>
    <div v-if="state.mode === 'raw'" style="padding-top: 8px;">
        <div style="border: 1px solid #E6E6E6">
            <Monaco ref="monacoEditRef" style="height: 420px" v-model:value="state.rawData" v-model:lang="state.lang" />
        </div>
    </div>
</template>


<style lang="less" scoped></style>