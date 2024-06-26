<script setup lang="tsx">
import {computed,onMounted, reactive, ref, unref } from 'vue'
import { useTable } from '@/hooks/web/useTable'
import { useI18n } from '@/hooks/web/useI18n'
import { Table, TableColumn } from '@/components/Table'
import { ElRow, ElCol,ElMessage } from 'element-plus'
import { Search } from '@/components/Search'
import { ContentWrap } from '@/components/ContentWrap'
import { Dialog } from '@/components/Dialog'
import { getEnvListApi,addEnvApi,putEnvApi,delEnvApi } from '@/api/vadmin/deploy/env'
import { useAuthStoreWithOut } from '@/store/modules/auth'
import { BaseButton } from '@/components/Button'
import { useDictStore } from '@/store/modules/dict'
import { selectDictLabel, DictDetail } from '@/utils/dict'
import Write from './components/Write.vue'

// 获取数据
const getLists = async (data:any) => {
  const { pageSize, currentPage } = tableState
  const res = await getEnvListApi({
    page: unref(currentPage),
    limit: unref(pageSize),
    ...unref(searchParams)
  })
  res.data = res.data.map((item) => {
    return item
  })
  return {
    list: res.data || [],
    total: res.count || 0
  }
}
const { t } = useI18n()
const authStore = useAuthStoreWithOut()
const { tableRegister, tableState, tableMethods } = useTable({
  fetchDataApi: async () => {
    const { pageSize, currentPage } = tableState
    return getLists({
      page: unref(currentPage),
      limit: unref(pageSize),
      ...unref(searchParams),
    })
  },
  fetchDelApi: async (value) =>{
    const res = await delEnvApi(value)
    return res.code === 200
  }
})

const envOptions = ref<DictDetail[]>([])

const getOptions = async () => {
  const dictStore = useDictStore()
  const dictOptions = await dictStore.getDictObj(['env_management'])
  envOptions.value = dictOptions.env_management
}

getOptions()

const { dataList, loading, total, pageSize, currentPage } = tableState
const { getList, delList} = tableMethods
const tableColumns = reactive<TableColumn[]>([
  // 多选框
  {
    field: 'selection',
    type: 'selection',
    show: true,
    disabled: true
  },
  {
    field: 'index',
    label: '序号',
    type: 'index',
    disabled: true
  },
  {
    field: 'env_name',
    label: '环境名称',
    disabled: true,
    width: '170px',
    slots: {
      default: (data: any) => {
        const row = data.row
        return (
          <>
            <div>{selectDictLabel(envOptions.value, row.env_name)}</div>
          </>
        )
      }
    }
  },
  {
    field: 'dns',
    label: '环境域名'
  },
  {
    field: 'remarks',
    label: '备注'
  },
  {
    field: 'create_datetime',
    label: '创建时间',
    width: '190px',
    sortable: true
  },
  {
    field: 'update_datetime',
    label: '更新时间',
    width: '190px'
  },
  {
    field: 'create_user.name',
    label: '创建人',
    disabled: true
  },
  {
    field: 'action',
    width: '150px',
    label: '操作',
    slots: {
      default: (data: any) => {
        const row = data.row
        const update = ['auth.user.update'] // 编辑权限控制
        const del = ['auth.user.delete'] // 删除权限控制
        return (
          <>
            <BaseButton 
              type="primary" 
              link 
              size="small" 
              v-hasPermi={update} // 检查更新权限
              onClick={() => editAction(row)}
            >
              编辑
            </BaseButton>
            <BaseButton
              type="danger"
              link
              size="small"
              v-hasPermi={del} // 检查删除权限
              loading={delLoading.value}
              onClick={() => delData(row)} // 调用delData方法
            >
              删除
            </BaseButton>
          </>
        )
      }
    }
  }
])
// 环境名称
const searchSchema = reactive<FormSchema[]>([
  {
    field: 'env_name',
    label: '环境名称',
    component: 'Input',
    componentProps: {
      clearable: true,
      style: {
        width: '214px'
      }
    },
    formItemProps: {
      labelWidth: '70px'
    }
  }
])
const searchParams = ref({})
const setSearchParams = (data: any) => {
  currentPage.value = 1
  searchParams.value = data
  getList()
}

const dialogVisible = ref(false)
const dialogTitle = ref('')
const currentRow = ref({})
const actionType = ref('')
const saveLoading = ref(false)
const writeRef = ref<ComponentRef<typeof Write>>()
// 新增方法
const addAction = () => {
  dialogTitle.value = '新增环境'
  actionType.value = 'add'
  currentRow.value = {}
  dialogVisible.value = true
}
// 编辑方法
const editAction = async (row: any) => {
    const res =  await getEnvListApi(row.id)
    if(res) {
      dialogTitle.value = '编辑环境'
      actionType.value = 'edit'
      currentRow.value = row
      dialogVisible.value = true
    }
}
// 删除方法
const delLoading = ref(false)

const delData = async (row?: any) => {
  if (row) {
    await delList(true, [row.id]).finally(()=>{
      delLoading.value = false
    }) // 删除单个项目
  } else {
    await delList(true).finally(()=>{
      delLoading.value = false
    }) // 批量删除选中的项目
  }
  delLoading.value = false
}

// 保存方法
const save = async () =>{
  const write = unref(writeRef)
  const formData = await write?.submit()
  if (formData) {
    saveLoading.value = true
    try {
      const res = ref({})
      if (actionType.value === 'add') {
        formData.create_user_id = user.value.id;
        res.value = await addEnvApi(formData)
        if (res.value) {
          dialogVisible.value = false
          getList()
          return ElMessage.success('新增成功')
        }
      } else if (actionType.value === 'edit') {        
        res.value = await putEnvApi(formData)
        if (res.value) {
          dialogVisible.value = false
          getList()
          return ElMessage.success('编辑成功')
        }
      }
    } finally {
      saveLoading.value = false
    }
  }
}
const user = computed(() => authStore.getUser)
</script>

<template>
  <ContentWrap>
    <!-- <Search :schema="searchSchema" @reset="setSearchParams" @search="setSearchParams" /> -->
    <Table
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      showAction
      :columns="tableColumns"
      default-expand-all
      node-key="id"
      :data="dataList"
      :loading="loading"
      :pagination="{
        total
      }"
      @register="tableRegister"
      @refresh="getList"
    >
    <template #toolbar>
        <ElRow :gutter="10">
          <ElCol :span="1.5" v-hasPermi="['auth.user.create']">
            <BaseButton type="primary" @click="addAction">新增环境</BaseButton>
          </ElCol>
          <ElCol :span="1.5" v-hasPermi="['auth.user.delete']">
            <BaseButton type="danger" @click="delData(null)">批量删除</BaseButton>
          </ElCol>
        </ElRow>
      </template>
    </Table>
  </ContentWrap>
  <Dialog v-model="dialogVisible" :title="dialogTitle" :height="650">
    <Write ref="writeRef" :current-row="currentRow" />
    <template #footer>
      <BaseButton type="primary" :loading="saveLoading" @click="save">
        {{ t('exampleDemo.save') }}
      </BaseButton>
      <BaseButton @click="dialogVisible = false">{{ t('dialogDemo.close') }}</BaseButton>
    </template>
  </Dialog>
</template>