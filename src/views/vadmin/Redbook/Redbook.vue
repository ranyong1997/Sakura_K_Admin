<script lang="ts" setup>
import { Waterfall } from '@/components/Waterfall'
import Mock from 'mockjs'
import { ref, unref } from 'vue'
import { toAnyString } from '@/utils'

const data = ref<any>([])

const getList = () => {
  const list: any = []
  for (let i = 0; i < 20; i++) {
    // 随机 100, 500 之间的整数
    const height = Mock.Random.integer(100, 500)
    const width = Mock.Random.integer(100, 500)
    list.push(
      Mock.mock({
        width,
        height,
        id: toAnyString(),
        image_uri: Mock.Random.image(`${width}x${height}`)
      })
    )
  }
  data.value = [...unref(data), ...list]
  if (unref(data).length >= 60) {
    end.value = true
  }
}
getList()

const loading = ref(false)

const end = ref(false)

const loadMore = () => {
  loading.value = true
  setTimeout(() => {
    getList()
    loading.value = false
  }, 1000)
}
</script>

<template>
  <Waterfall
    :data="data"
    :loading="loading"
    :end="end"
    :props="{
      src: 'image_uri',
      height: 'height'
    }"
    @load-more="loadMore"
  />
</template>
