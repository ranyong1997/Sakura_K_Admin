<script setup lang="ts" name="httpTable">
import {ElTable, ElTableColumn, ElInput,} from 'element-plus';
import {Icon} from '@/components/Icon'
import {ref, watch} from 'vue'

const emit = defineEmits(['change'])
// 该组件用于：用户输入参数
const tableData = ref([
  {name: null, value: null},
])

/**
 * 当输入框输入时
 * 如果后边没有 则加一行
 */
const addRow = (e) => {
  if (tableData.value[tableData.value.length - 1].name != null) {
    tableData.value.push({name: null, value: null});
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

</script>

<template>
  <div class="httpTable">
    <ElTable :data="tableData" style="width: 100%" border>
      <ElTableColumn label="参数名">
        <template #default="scope">
          <ElInput v-model="scope.row.name" placeholder="添加参数" clearable @input="addRow"/>
        </template>
      </ElTableColumn>
      <ElTableColumn label="参数值">
        <template #default="scope">
          <ElInput v-model="scope.row.value" clearable/>
        </template>
      </ElTableColumn>
      <ElTableColumn label="操作" width="80">
        <template #default="scope">
          <Icon
              icon="ep:remove" color="var(--el-color-error)" size="18"
              v-if="scope.$index != tableData.length - 1" @click="removeItem(scope.$index)"/>
        </template>
      </ElTableColumn>
    </ElTable>
  </div>
</template>


<style lang="less" scoped></style>