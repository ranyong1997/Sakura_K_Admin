<script setup lang="ts" name="httpFormData">
import {
  ElUpload,
  ElMessageBox,
  ElMessage,
  UploadProps,
  UploadUserFile,
  ElButton,
  ElInput,
  ElOption,
  ElSelect,
  ElTable,
  ElTableColumn,
} from 'element-plus';
import {Icon} from '@/components/Icon'
import {reactive, ref, watch} from 'vue'
import {Upload} from '@/api/vadmin/tools/httptest'

// 文件
const file = ref('');
// 上传文件需要异步
const handleFileChange = (event, name) => {
  console.log("event, name", event, name);
  if (event.target && event.target.files && event.target.files[0]) {
    const formData = new FormData();
    formData.append(name, event.target.files[0]);
  }
};

const emit = defineEmits(['change'])
// 该组件用于：form_data 单独处理
const tableData = ref([
  {name: null, value: null},
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
    tableData.value.push({name: null, value: null});
  }
}
// 删除当前行
const removeItem = (e) => {
  tableData.value.splice(e, 1);
}

// 选择文件
const selectFile = (index) => {
  let fileRef = document.getElementById('selectFile' + index)
  if (fileRef) fileRef.click()
}

// 假文件数据
const fileList = ref<UploadUserFile[]>([
  {
    name: 'element-plus-logo.svg',
    url: 'https://element-plus.org/images/element-plus-logo.svg',
  },
  {
    name: 'element-plus-logo2.svg',
    url: 'https://element-plus.org/images/element-plus-logo.svg',
  },
])

const handlePreview: UploadProps['onPreview'] = (uploadFile) => {
  console.log(uploadFile)
}

const handleRemove: UploadProps['onRemove'] = (file, uploadFiles) => {
  console.log(file, uploadFiles)
}
const handleExceed: UploadProps['onExceed'] = (files, uploadFiles) => {
  ElMessage.warning(
      `The limit is 3, you selected ${files.length} files this time, add up to ${
          files.length + uploadFiles.length
      } totally`
  )
}

const beforeRemove: UploadProps['beforeRemove'] = (uploadFile, uploadFiles) => {
  return ElMessageBox.confirm(
      `Cancel the transfer of ${uploadFile.name} ?`
  ).then(
      () => true,
      () => false
  )
}


watch(
    () => tableData,
    (val) => {
      console.log("val", val)
      // 默认写死的路径
      Upload(file)
          .then(response => {
            console.log('Request successful:', response);
          })
          .catch(error => {
            console.error('Request failed:', error);
          });
    },
    {deep: true}
);
// 默认选择为text
const select = ref('text')
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
        <ElSelect v-model="select">
          <ElOption v-for="item in state.formDatatypeOptions" :key="item" :label="item" :value="item"/>
        </ElSelect>
      </ElTableColumn>
      <ElTableColumn label="参数值">
        <template #default="scope">
          <div v-if="select === 'file'" class="file-input">
            <ElUpload v-model:file-list="fileList"
                      class="upload-demo"
                      :on-preview="handlePreview"
                      :on-remove="handleRemove"
                      :before-remove="beforeRemove"
                      :limit="3"
                      :on-exceed="handleExceed">
              <ElButton :id="selectFile" @change="handleFileChange($event, scope.row.name)">
                <Icon icon="ep:upload"/>
                Upload
              </ElButton>
            </ElUpload>

          </div>
          <ElInput v-else v-model="scope.row.value" clearable/>
        </template>
      </ElTableColumn>
      <ElTableColumn label="操作" width="80">
        <template #default="scope">
          <Icon
              icon="ep:remove"
              color="var(--el-color-error)"
              size="18"
              v-if="scope.$index != tableData.length - 1"
              @click="removeItem(scope.$index)"
          />
        </template>
      </ElTableColumn>
    </ElTable>
  </div>
</template>


<style lang="less" scoped></style>