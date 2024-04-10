<script setup lang="tsx">
import { Form, FormSchema } from '@/components/Form'
import { useForm } from '@/hooks/web/useForm'
import { PropType, reactive, watch } from 'vue'
import { useValidator } from '@/hooks/web/useValidator'
import { useDictStore } from '@/store/modules/dict'

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
    },
    formItemProps: {
      rules: [required()]
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
      }
    },
    // 下拉选择当前用户
    optionApi: async () => {
      const dictStore = useDictStore()
      const dictOptions = await dictStore.getDictObj(['sys_vadmin_platform'])
      return dictOptions.sys_vadmin_platform
    },
    formItemProps: {
      rules: [required()]
    }
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
      }
    },
    // 下拉开发角色
    optionApi: async () => {
      const dictStore = useDictStore()
      const dictOptions = await dictStore.getDictObj(['sys_vadmin_platform'])
      return dictOptions.sys_vadmin_platform
    },
    formItemProps: {
      rules: [required()]
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
    },
    formItemProps: {
      rules: [required()]
    }
  }
])

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
  <Form @register="formRegister" :schema="formSchema" />
</template>
