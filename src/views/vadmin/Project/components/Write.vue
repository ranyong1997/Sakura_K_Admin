<script setup lang="tsx">
import { computed, ref } from 'vue'
import { useAuthStoreWithOut } from '@/store/modules/auth'
import { getProjectApi, getProjectList } from '@/api/vadmin/project/project'

const authStore = useAuthStoreWithOut()
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

const user = computed(() => authStore.getUser)

console.log('--------', user.value.id)
</script>