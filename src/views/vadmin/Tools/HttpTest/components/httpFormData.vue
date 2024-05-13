<script setup lang="ts" name="httpFormData">
import {ElInput, ElOption, ElSelect, ElTable, ElTableColumn,} from 'element-plus';
import {Icon} from '@/components/Icon'
import {reactive, ref, watch} from 'vue'
import { Upload } from '@/api/vadmin/tools/httptest'

// 文件
const file = ref(null);
// 上传文件需要异步
const handleFileChange = (event, name) => {
  if (event.target && event.target.files && event.target.files[0]) {
    const formData = new FormData();
    formData.append(name, event.target.files[0]);
    Upload('/demo', formData)
      .then((response) => {
        console.log('Request successful:', response);
      })
      .catch((error) => {
        console.error('Request failed:', error);
      });
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
console.log("selectFile",selectFile)

// 选择文件时触发，上传文件，回写地址
const fileChange = (e, row, index) => {
  state.fileData = e.target.files[0]
  let file = e.target.files[0]
  let formData = new FormData
  // formData.append('name', file.name)
  formData.append('file', file)
  useFileApi().upload(formData)
      .then((res) => {
        row.value = res.data
      })
      .catch(() => {
        let fileRef = document.getElementById('selectFile' + index)
        if (fileRef) fileRef.value = ''
        row.value = ""
      })

}

watch(
  () => tableData,
  (val) => {
    let formData = new FormData();
    for (let item of val.value) {
      if (item.name != null) {
        console.log("--->",item)
        if (item.type !== 'file') {
          formData.append(item.name, item.value);
        }
      }
    }
    // 默认写死的路径
    const path = '/demo';
    Upload(path, formData)
      .then(response => {
        console.log('Request successful:', response);
      })
      .catch(error => {
        console.error('Request failed:', error);
      });
  },
  { deep: true }
);
// 默认选择为text
const select = ref('text')
</script>

<template>
  <div>
    <ElTable :data="tableData" style="width: 100%" border>
      <ElTableColumn label="参数名">
        <template #default="scope">
          <ElInput v-model="scope.row.name" placeholder="添加参数" clearable @input="addRow" />
          <ElSelect v-model="select">
            <ElOption v-for="item in state.formDatatypeOptions" :key="item" :label="item" :value="item" />
          </ElSelect>
        </template>
      </ElTableColumn>
      <ElTableColumn label="参数值">
        <template #default="scope">
          <div v-if="select === 'file'" class="file-input">
            <ElInput :id="'selectFile'" type="file" @change="handleFileChange($event, scope.row.name)" />
          </div>
          <ElInput v-else v-model="scope.row.value" clearable />
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