<script setup lang="tsx">
import { Form, FormSchema } from '@/components/Form'
import { useForm } from '@/hooks/web/useForm'
import { PropType, reactive, watch } from 'vue'
import { useValidator } from '@/hooks/web/useValidator'
import { getDataSourceListApi} from '@/api/vadmin/deploy/data'
const { required } = useValidator()
const props = defineProps({
  currentRow: {
    type: Object as PropType<any>,
    default: () => null
  }
})
const formSchema = reactive<FormSchema[]>([
  {
    field: 'data_name',
    label: '数据源名称',
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
    field: 'type',
    label: '类型',
    colProps: {
      span: 24
    },
    component: 'Select',
    componentProps: {
      style: {
        width: '100%'
      },
      props:{
        label:'type_name',
        value:'type.type_name'
      },
      showWordLimit: true
    },
    // 下拉选择用户
    optionApi: async () => {
      const res = await getDataSourceListApi()
      return res.data
    }
    
  },
  {
    field: 'host',
    label: '地址',
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
    field: 'port',
    label: '端口',
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
    field: 'username',
    label: '用户名',
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
    field: 'password',
    label: '密码',
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
  }
])

const rules = reactive({
  env_name: [required()],
  dns: [required()]
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
