<script setup lang="tsx">
import {computed,onMounted, reactive, ref, unref } from 'vue'
import { useTable } from '@/hooks/web/useTable'
import { useI18n } from '@/hooks/web/useI18n'
import { Table, TableColumn } from '@/components/Table'
import { ElButton, ElSwitch, ElRow, ElCol, ElMessage } from 'element-plus'
import { Search } from '@/components/Search'
import { ContentWrap } from '@/components/ContentWrap'
import { Dialog } from '@/components/Dialog'
import { selectDictLabel, DictDetail } from '@/utils/dict'
import { useDictStore } from '@/store/modules/dict'
import { getProjectList,createProject,editProject } from '@/api/vadmin/project/project'
import { useAuthStoreWithOut } from '@/store/modules/auth'
import Write from './components/Write.vue'

const { t } = useI18n()
const authStore = useAuthStoreWithOut()
const { tableRegister, tableState, tableMethods } = useTable({
  fetchDataApi: async () => {
    const { pageSize, currentPage } = tableState
    const res = await getProjectList({
      page: unref(currentPage),
      limit: unref(pageSize),
      ...unref(searchParams)
    })
    res.data = res.data.map(item => {
      item.username = user.value.nickname
      return item
    })
    return {
      list: res.data || [],
      total: res.count || 0
    }
  }
})
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
    field: 'id',
    label: '序号',
    width: '100px',
    show: true,
    disabled: true
  },
  {
    field: 'project_name',
    label: '项目名称',
    show: true,
    disabled: true
  },
  {
    field: 'responsible_name',
    label: '负责人',
    show: true
  },
  {
    field: 'test_user',
    label: '测试人',
    show: true
  },
  {
    field: 'dev_user',
    label: '开发人员',
    show: true,
    disabled: true
  },
  {
    field: 'publish_app',
    label: '发布应用',
    show: true,
    disabled: true
  },
  {
    field: 'simple_desc',
    label: '简要描述',
    show: true
  },
  {
    field: 'remarks',
    label: '备注',
    show: true
  },
  {
    field: 'update_datetime',
    label: '更新时间',
    show: true,
    width: '190px'
  },
  {
    field: 'create_datetime',
    label: '创建时间',
    width: '190px',
    show: true
  },
  {
    field: 'username',
    label: '创建人',
    show: true,
    disabled: true
  },
  {
    field: 'action',
    width: '150px',
    label: '操作',
    show: true,
    slots: {
      default: (data: any) => {
        const row = data.row
        const update = ['auth.user.update'] // 编辑权限控制
        const del = ['auth.user.delete'] // 删除权限控制
        return (
          <>
            <ElButton
              type="primary"
              v-hasPermi={update} // 检查编辑权限
              link
              size="small"
              onClick={() => editAction(row)} // 调用editAction方法
            >
              编辑
            </ElButton>
            <ElButton
              type="danger"
              v-hasPermi={del} // 检查删除权限
              loading={delLoading.value}
              link
              size="small"
              onClick={() => delData(row)} // 调用delData方法
            >
              删除
            </ElButton>
          </>
        )
      }
    }
  }
])
// 项目名称
const searchSchema = reactive<FormSchema[]>([
  {
    field: 'project_name',
    label: '项目名称',
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
const delLoading = ref(false)
const delData = async (row?: any) => {
  delLoading.value = true
  if (row) {
    await delList(true, [row.id]) // 删除单个项目
  } else {
    await delList(true) // 批量删除选中的项目
  }
  delLoading.value = false
}
const dialogVisible = ref(false)
const dialogTitle = ref('')
const currentRow = ref({})
const actionType = ref('')
const saveLoading = ref(false)

const writeRef = ref<ComponentRef<typeof Write>>()


// 编辑方法
const editAction = async (row: any) => {
  const res = await getProjectList(row.id)
  if (res) {
    dialogTitle.value = '编辑项目'
    res.data.role_ids = res.data.roles.map((item: any) => item.id)
    actionType.value = 'edit'
    currentRow.value = res.data
    dialogVisible.value = true
  }
}

// 新增方法
const addAction = () => {
  dialogTitle.value = '新增项目'
  actionType.value = 'add'
  currentRow.value = {}
  dialogVisible.value = true
}

// 保存方法
const save = async () =>{
  const write = unref(writeRef)
  const formData = await write?.submit()
  console.log("----1",formData);
  if (formData) {
    saveLoading.value = true
    try {
      const res = ref({})
      if (actionType.value === 'add') {
        formData.create_user_id = user.value.id;
        res.value = await createProject(formData)
        if (res.value) {
          dialogVisible.value = false
          getList()
        }
      } else if (actionType.value === 'edit') {
        res.value = await editProject(formData)
        if (res.value) {
          dialogVisible.value = false
          getList()
        }
      }
    } finally {
      saveLoading.value = false
    }
  }
}

const selections = ref([] as any[])
const user = computed(() => authStore.getUser)

console.log('------',user.value.name)
console.log('----111--',user.value.id)
onMounted(async () => {
  getProjectList({}).then(res=>{
    dataList.value = res.data.map(item=>{
      item.username= user.value.name
      console.log("--->item.username",item.username)
      return item
    });
    
    console.log("---->",dataList.value)
    console.log('res--->',res)
  });
})
</script>

<template>
  <ContentWrap>
    <Search :schema="searchSchema" @reset="setSearchParams" @search="setSearchParams" />
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
            <ElButton type="primary" @click="addAction">新增项目</ElButton>
          </ElCol>
          <ElCol :span="1.5" v-hasPermi="['auth.user.delete']">
            <ElButton type="danger" @click="delData(null)">批量删除</ElButton>
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