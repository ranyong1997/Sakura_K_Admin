<script setup lang="ts" name="httpFormData">
import {
  ElButton,
  ElInput,
  ElOption,
  ElSelect,
  ElTable,
  ElTableColumn,
  ElUpload,
  genFileId,
  UploadInstance,
  UploadProps,
  UploadRawFile
} from 'element-plus';
import {Icon} from '@/components/Icon'
import {reactive, ref, watch} from 'vue'

const emit = defineEmits(['change'])
// 该组件用于：form_data 单独处理
const tableData = ref([
  {name: null, value: null, type: 'text', file: []}
])

// 用于下拉框
const state = reactive({
  formDatatypeOptions: ['text', 'file']
});

/**
 * 当输入框输入时
 * 如果后边没有 则加一行
 */
const addRow = () => {
  if (tableData.value[tableData.value.length - 1].name != null) {
    tableData.value.push({name: null, value: null, type: 'text', file: []})
  }
}
// 删除当前行
const removeItem = (e) => {
  tableData.value.splice(e, 1);
}

// 上传
const upload = ref<UploadInstance>()

const handleExceed: UploadProps['onExceed'] = (files) => {
  upload.value!.clearFiles()
  let file = files[0] as UploadRawFile
  file.uid = genFileId()
  upload.value!.handleStart(file)
}

watch(
    () => tableData,
    (val) => {
      console.log("val", val);
      // 构造后台需要的结果
    },
    {deep: true}
);
</script>

<template>
  <div>
    <ElTable :data="tableData" style="width: 100%" border>
      <ElTableColumn label="参数名">
        <template #default="scope">
          <ElInput v-model="scope.row.name" placeholder="添加参数" clearable @input="addRow"/>
        </template>
      </ElTableColumn>
      <ElTableColumn label="类型">
        <template #default="scope">
          <ElSelect v-model="scope.row.type">
            <ElOption v-for="item in state.formDatatypeOptions" :key="item" :label="item" :value="item"/>
          </ElSelect>
        </template>
      </ElTableColumn>
      <ElTableColumn label="参数值">
        <template #default="scope">
          <el-upload v-if="scope.row.type === 'file'" ref="upload" class="upload" :limit="1" :on-exceed="handleExceed"
                     v-model:file-list="scope.row.file" :auto-upload="false">
            <template #trigger>
              <el-button type="primary">选择文件</el-button>
            </template>
          </el-upload>

          <ElInput v-else v-model="scope.row.value" clearable/>
        </template>
      </ElTableColumn>
      <ElTableColumn label="操作" width="80">
        <template #default="scope">
          <Icon icon="ep:remove" color="var(--el-color-error)" size="18" v-if="scope.$index != tableData.length - 1"
                @click="removeItem(scope.$index)"/>
        </template>
      </ElTableColumn>
    </ElTable>
  </div>
</template>


<style lang="less" scoped></style>