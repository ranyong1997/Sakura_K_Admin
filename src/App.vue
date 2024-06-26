<script setup lang="ts">
import { computed } from 'vue'
import { useAppStore } from '@/store/modules/app'
import { ConfigGlobal } from '@/components/ConfigGlobal'
import { useDesign } from '@/hooks/web/useDesign'
import { getSystemBaseConfigApi } from '@/api/vadmin/system/settings'

const { getPrefixCls } = useDesign()

const prefixCls = getPrefixCls('app')

const appStore = useAppStore()

const currentSize = computed(() => appStore.getCurrentSize)

const greyMode = computed(() => appStore.getGreyMode)

// 添加mate标签
const addMeta = (name: string, content: string) => {
  const meta = document.createElement('meta')
  meta.content = content
  meta.name = name
  document.getElementsByTagName('head')[0].appendChild(meta)
}

// 获取并设置系统配置
const setSystemConfig = async () => {
  if (appStore.getLogoImage) {
    return
  }
  const res = await getSystemBaseConfigApi()
  if (res) {
    appStore.setTitle(res.data.web_title || import.meta.env.VITE_APP_TITLE)
    appStore.setLogoImage(res.data.web_logo || '/media/system/logo.png')
    appStore.setFooterContent(res.data.web_copyright || 'Copyright ©2022-present RY')
    appStore.setIcpNumber(res.data.web_icp_number || '')
    addMeta(
      'description',
      res.data.web_desc || 'Sakura_K_Admin 是一套开箱即用的中后台解决方案，可以作为新项目的启动模版。'
    )
  }
}

appStore.initTheme()
setSystemConfig()
</script>

<template>
  <ConfigGlobal :size="currentSize">
    <RouterView :class="greyMode ? `${prefixCls}-grey-mode` : ''" />
  </ConfigGlobal>
</template>

<style lang="less">
@prefix-cls: ~'@{namespace}-app';

.size {
  width: 100% !important;
  height: 100%;
}

html,
body {
  padding: 0 !important;
  margin: 0;
  overflow: hidden;
  .size;

  #app {
    .size;
  }
}

.@{prefix-cls}-grey-mode {
  filter: grayscale(100%);
}

ol {
  display: block;
  list-style-type: decimal;
  margin-block: 1em 1em;
  margin-inline: 0 0;
  padding-inline-start: 40px;
}
</style>
