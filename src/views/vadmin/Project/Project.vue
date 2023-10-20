<script setup lang="tsx">
import { reactive, ref, unref } from 'vue'
import { useTable } from '@/hooks/web/useTable'
import { useI18n } from '@/hooks/web/useI18n'
import { Table, TableColumn } from '@/components/Table'
import { ElButton, ElSwitch, ElRow, ElCol, ElMessage } from 'element-plus'
import { Search } from '@/components/Search'
import { FormSchema } from '@/components/Form'
import { ContentWrap } from '@/components/ContentWrap'
import { Dialog } from '@/components/Dialog'
import { selectDictLabel, DictDetail } from '@/utils/dict'
import { useDictStore } from '@/store/modules/dict'

const { t } = useI18n()

const { tableRegister, tableState, tableMethods } = useTable({
  fetchDataApi: async () => {
    const { pageSize, currentPage } = tableState
    const res = await getUserListApi({
      page: unref(currentPage),
      limit: unref(pageSize),
      ...unref(searchParams)
    })
    return {
      list: res.data || [],
      total: res.count || 0
    }
  }
})

const { dataList, loading, total, pageSize, currentPage } = tableState
const { getList, delList, getSelections, exportQueryList } = tableMethods
const tableColumns = reactive<TableColumn[]>([
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
    field: 'name',
    label: '项目名称',
    show: true,
    disabled: true
  },
  {
    field: 'principal',
    label: '负责人',
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
    label: '描述',
    show: true,
    disabled: true
  },
  {
    field: 'config_id',
    label: '关联配置',
    show: true,
    disabled: true
  },
  {
    field: 'last_login',
    label: '更新时间',
    show: true,
    width: '190px'
  },
  {
    field: 'created_by_name',
    label: '更新人',
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
    field: 'action',
    width: '150px',
    label: '操作',
    show: true,
    slots: {
      default: (data: any) => {
        const row = data.row
        const update = ['auth.user.update']
        const del = ['auth.user.delete']
        return (
          <>
            <ElButton
              type="primary"
              v-hasPermi={update}
              link
              size="small"
              onClick={() => editAction(row)}
            >
              编辑
            </ElButton>
            <ElButton
              type="danger"
              v-hasPermi={del}
              loading={delLoading.value}
              link
              size="small"
              onClick={() => delData(row)}
            >
              删除
            </ElButton>
          </>
        )
      }
    }
  }
])

const searchSchema = reactive<FormSchema[]>([
  {
    field: 'projectname',
    label: '项目名称',
    component: 'Input',
    componentProps: {
      clearable: false,
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
    await delList(true, [row.id]).finally(() => {
      delLoading.value = false
    })
  } else {
    await delList(true).finally(() => {
      delLoading.value = false
    })
  }
}

const dialogVisible = ref(false)
const dialogTitle = ref('')

const currentRow = ref()
const actionType = ref('')

const editAction = async (row: any) => {
  const res = await getProjectApi(row.id)
  if (res) {
    dialogTitle.value = '编辑项目'
    res.data.role_ids = res.data.roles.map((item: any) => item.id)
    actionType.value = 'editproject'
    currentRow.value = res.data
    dialogVisible.value = true
  }
}

const addAction = () => {
  dialogTitle.value = '新增项目'
  actionType.value = 'addproject'
  currentRow.value = undefined
  dialogVisible.value = true
}

const selections = ref([] as any[])
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
</template>
