<template>
    <div ref="monacoContainer" class="monico"></div>
</template>
<script setup lang="ts" name="monico">
// 该组件用于：编辑器
import { ref, onMounted } from 'vue'
import * as monaco from 'monaco-editor'
import type { editor } from 'monaco-editor'

let monacoEditor: editor.IStandaloneCodeEditor

const monacoContainer = ref<HTMLElement | null>(null)

onMounted(() => {
    monacoEditor = monaco.editor.create(monacoContainer.value!, {
        value: 'select  * from ',
        language: 'SQL',
        theme: 'vs'
    })
})

</script>
<style lang="less" scoped>
.monico {
    width: 100%;
    height: 100%;
}
</style>