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

const dataTypeOptions = ref<DictDetail[]>([])

// 获取字典类型
const getOptions = async () => {
  const dictStore = useDictStore()
  const dictOptions = await dictStore.getDictObj(['data_type'])
  dataTypeOptions.value = dictOptions.data_type
}

getOptions()

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
    field: 'type_id',
    label: '数据源类型',
    colProps: {
      span: 24
    },
    component: 'Select',
    componentProps: {
      style: {
        width: '100%'
      }
    },
    optionApi: async () => {
      const dictStore = useDictStore()
      const dictOptions = await dictStore.getDictObj(['data_type'])
      return dictOptions.data_type
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
      showWordLimit: true,
      placeholder: "127.0.0.1"
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
      showWordLimit: true,
      placeholder: "3306"
    },
  },
  {
    field: 'user',
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
      showWordLimit: true,
      placeholder: "root"
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
      type: "password",
      showPassword: true,
      showWordLimit: true
    }
  }
])

const rules = reactive({
  data_name: [required()],
  type_id: [required()],
  host: [required()],
  port: [required()],
  user: [required()],
  password: [required()]

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
