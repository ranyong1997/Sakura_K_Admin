<script setup lang="tsx">
import { Form, FormSchema } from '@/components/Form'
import { useForm } from '@/hooks/web/useForm'
import { PropType, reactive, watch,ref } from 'vue'
import { useValidator } from '@/hooks/web/useValidator'
import { useDictStore } from '@/store/modules/dict'
import { DictDetail } from '@/utils/dict'

const { required } = useValidator()
const props = defineProps({
  currentRow: {
    type: Object as PropType<any>,
    default: () => null
  }
})

const envOptions = ref<DictDetail[]>([])

// 获取字典类型
const getOptions = async () => {
  const dictStore = useDictStore()
  const dictOptions = await dictStore.getDictObj(['env_management'])
  envOptions.value = dictOptions.env_management
}

getOptions()

const formSchema = reactive<FormSchema[]>([
  {
    field: 'env_name',
    label: '环境名称',
    component: 'Select',
    colProps: {
      span: 24
    },
    componentProps: {
      style: {
        width: '100%'
      }
    },
    optionApi: async () => {
      const dictStore = useDictStore()
      const dictOptions = await dictStore.getDictObj(['env_management'])
      return dictOptions.env_management
    }
  },
  {
    field: 'dns',
    label: '环境地址',
    colProps: {
      span: 24
    },
    component: 'Input',
    componentProps: {
      style: {
        width: '100%'
      },
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
      rows: 4,
      type: 'textarea',
      style: {
        width: '600px'
      },
      maxlength: 100,
      showWordLimit: true
    }
  },
  {
    field: 'HTTPConfig',
    component: 'Divider',
    label: 'HTTP配置'
  },
  {
    field: 'headers',
    label: '通用请求头',
    component: 'JsonEditor',
    colProps: {
      span: 24
    },
    componentProps: {
      style: {
        width: '100%'
      },
      showWordLimit: true
    },
    value: [{
      key: "",
      value: "",
      remarks: ""
    }]
  },
  {
    field: 'GenericConfig',
    component: 'Divider',
    label: '通用配置'
  },
  {
    field: 'env_variables',
    label: '环境变量',
    component: 'JsonEditor',
    colProps: {
      span: 24
    },
    componentProps: {
      style: {
        width: '100%'
      },
      showWordLimit: true
    },
    value: [{
      key: "",
      value: "",
      remarks: ""
    }]
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
