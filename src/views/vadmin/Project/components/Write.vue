<script setup lang="tsx">
import { Form, FormSchema } from '@/components/Form'
import { useForm } from '@/hooks/web/useForm'
import { PropType, reactive, watch } from 'vue'
import { useValidator } from '@/hooks/web/useValidator'
import { getUserListApi } from '@/api/vadmin/auth/user'

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
      },
      maxlength: 10,
      showWordLimit: true
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
      },
      maxlength: 10,
      showWordLimit: true
    },
    formItemProps: {
      rules: [required()]
    },
    maxlength: 10,
    showWordLimit: true
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
      },
      maxlength: 20,
      showWordLimit: true
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
      rows:4,
      type: 'textarea',
      style: {
        width: '600px'
      },
      maxlength: 100,
      showWordLimit: true
    }
  },
])
const rules = reactive({
  project_name: [required()],
  responsible_name: [required()],
  dev_user: [required()],
  test_user: [required()]
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
