<script setup lang="tsx">
import { Form, FormSchema } from '@/components/Form'
import { useForm } from '@/hooks/web/useForm'
import { PropType, reactive, watch,unref } from 'vue'
import { useValidator } from '@/hooks/web/useValidator'
import { useDictStore } from '@/store/modules/dict'
import { getUserListApi } from '@/api/vadmin/auth/user'
import {ref} from 'vue'

const { required } = useValidator()

const props = defineProps({
  currentRow: {
    type: Object as PropType<any>,
    default: () => null
  }
})

const formSchema = reactive<FormSchema[]>([
  {
    field: 'project_name',
    label: '项目名称',
    component: 'Input',
    colProps: {
      span: 24
    },
    componentProps: {
      style: {
        width: '100%'
      }
    }
  },
  {
    field: 'responsible_name',
    label: '负责人',
    colProps: {
      span: 24
    },
    component: 'Select',
    componentProps: {
      style: {
        width: '100%'
      },
      props:{
        label:'nickname',
        value:'nickname'
      }
    },
    // 下拉选择用户
    optionApi: async () => {
      const res = await getUserListApi()
      return res.data
    },
  },
  {
    field: 'dev_user',
    label: '开发人员',
    colProps: {
      span: 24
    },
    component: 'Select',
    componentProps: {
      style: {
        width: '100%'
      },
      props:{
        label:'nickname',
        value:'nickname'
      }
    },
    // 下拉选择用户
    optionApi: async () => {
      const res = await getUserListApi()
      return res.data
    }
  },
  {
    field: 'test_user',
    label: '测试人员',
    colProps: {
      span: 24
    },
    component: 'Select',
    componentProps: {
      style: {
        width: '100%'
      },
      props:{
        label:'nickname',
        value:'nickname'
      }
    },
    // 下拉选择用户
    optionApi: async () => {
      const res = await getUserListApi()
      return res.data
    }
  },
  {
    field: 'publish_app',
    label: '发布应用',
    component: 'Input',
    colProps: {
      span: 24
    },
    componentProps: {
      style: {
        width: '100%'
      }
    },
    formItemProps: {
      rules: [required()]
    }
  },
  {
    field: 'simple_desc',
    label: '简要描述',
    component: 'Input',
    colProps: {
      span: 24
    },
    componentProps: {
      style: {
        width: '100%'
      }
    }
  },
  {
    field: 'remarks',
    label: '备注',
    component: 'Input',
    colProps: {
      span: 24
    },
    componentProps: {
      style: {
        width: '100%'
      }
    }
  },
])

const rules = reactive({
  project_name: [required()],
  responsible_name: [required()],
  dev_user: [required()],
  test_user: [required()],
  simple_desc: [required()],
  remarks: [required()]
})

const { formRegister, formMethods } = useForm()
const { setValues, getFormData, getElFormExpose } = formMethods

const submit = async () => {
  const elForm = await getElFormExpose()
  const valid = await elForm?.validate()
  if (valid) {
    const formData = await getFormData()
    return formData
  }
}

watch(
  () => props.currentRow,
  (currentRow) => {
    if (!currentRow) return
    setValues(currentRow)
  },
  {
    deep: true,
    immediate: true
  }
)

defineExpose({
  submit
})
</script>

<template>
  <Form :rules="rules" @register="formRegister" :schema="formSchema" />
</template>
