<script setup lang="ts" name="httpFormData">
import { ElSelect, ElOption, ElTable, ElTableColumn, ElInput, } from 'element-plus';
import { Icon } from '@/components/Icon'
import { ref, watch, reactive } from 'vue'
const emit = defineEmits(['change'])
// 该组件用于：form_data 单独处理
const tableData = ref([
    { name: null, value: null },
])

const state = reactive({
    formDatatypeOptions: ['text', 'file']
});

/**
 * 当输入框输入时
 * 如果后边没有 则加一行
 */
const addRow = (e) => {
    if (tableData.value[tableData.value.length - 1].name != null) {
        tableData.value.push({ name: null, value: null });
    }
}
// 删除当前行
const removeItem = (e) => {
    tableData.value.splice(e, 1);
}

watch(
    () => tableData,
    (val) => {
        let res = {};
        for (let item of val.value) {
            if (item.name != null && item.value != null) {
                res[item.name] = item.value;
            }
        }
        emit('change', res);
    },
    {
        deep: true
    }
)
const select = ref('')

</script>

<template>
    <div>
        <ElTable :data="tableData" style="width: 100%" border>
            <ElTableColumn label="参数名">
                <template #default="scope">
                    <ElInput v-model="scope.row.name" placeholder="添加参数" clearable @input="addRow" />
                    <el-select v-model="select" placeholder="Select" style="width: 115px">
                        <el-option v-for="item in state.formDatatypeOptions" :key="item" :label="item" :value="item"/>
                    </el-select>
                </template>
            </ElTableColumn>
            <ElTableColumn label="参数值">
                <template #default="scope">
                    <ElInput v-model="scope.row.value" clearable />
                </template>
            </ElTableColumn>
            <ElTableColumn label="操作" width="80">
                <template #default="scope">
                    <Icon
icon="ep:remove" color="var(--el-color-error)" size="18"
                        v-if="scope.$index != tableData.length - 1" @click="removeItem(scope.$index)" />
                </template>
            </ElTableColumn>
        </ElTable>
    </div>
</template>


<style lang="less" scoped></style>