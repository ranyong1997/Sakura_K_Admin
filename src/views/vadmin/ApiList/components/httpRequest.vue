<script setup lang="ts" name="httpRequest">
import {ElDropdown, ElDropdownItem, ElDropdownMenu, ElIcon, ElRadio, ElRadioGroup} from 'element-plus';
import {reactive, ref} from 'vue'
import HttpFormData from "./httpFormData.vue";
// 传递的参数
const model = defineModel();

// 类型
const radios = ref([
  {value: 0, label: 'none'},
  {value: 1, label: 'form_data'},
  {value: 2, label: 'x_www_form_urlencoded'},
  {value: 3, label: 'json'},
  {value: 4, label: 'raw'}
])

// 返回的方法
const emit = defineEmits(["updateContentType"]);

const monacoEditRef = ref()
// 初始化状态
const state = reactive({
  mode: 4,
  language: 'JSON',
  languageList: ['JSON', 'Text', 'JavaScript', 'HTML', 'XML'],
  popoverOpen: false,
  rawData: "",
  dataTypeOptions: ['string', 'int', 'float', 'boolean'],
  formData: [],
  fileData: {},
  x_www_form_urlencoded: [],
  lang: 'json'
});

// 处理raw 语言
const handleLanguage = (language) => {
  state.popoverOpen = !state.popoverOpen
  state.language = language
  updateContentType()
}

// 处理头信息
const updateContentType = (remove = false) => {
  emit('updateContentType', state.mode, state.language, remove)
}
</script>

<template>
  <div class="httpRequest">
    <ElRadioGroup size="small" v-model="model.body.mode" class="radio-group" @change="radioChange">
      <ElRadio v-for="item in radios" :key="item.value" :value="item.value" :label="item.label"/>
      <ElDropdown @command="handleLanguage" trigger="click" v-if="model.body.mode == 4" placement="bottom-start">
        <span class="el-button--text">
          {{ state.language }}
          <ElIcon class="el-icon--right">
            <arrowDown/>
          </ElIcon>
        </span>
        <template #dropdown>
          <ElDropdownMenu style="width: 150px">
            <!-- 下拉选项 -->
            <ElDropdownItem v-for="language in state.languageList" :key="language" :command="language">
              {{ language }}
            </ElDropdownItem>
          </ElDropdownMenu>
        </template>
      </ElDropdown>
    </ElRadioGroup>
  </div>
  <!---------------------------none------------------------------------>
  <div class="body-style none" v-if="model.body.mode == 0"> 该请求没有 Body 体</div>
  <!---------------------------form_data------------------------------------>
  <div class="body-style" v-if="model.body.mode == 1">
    <httpFormData v-model="model"/>
  </div>
  <!---------------------------x-www-form-urlencoded------------------------------------>
  <div class="body-style" v-if="model.body.mode == 2">
    <Monaco ref="monacoEditRef" style="height: 420px" v-model:value="state.rawData" v-model:lang="state.lang"/>
  </div>
  <!---------------------------json------------------------------------>
  <div class="body-style" v-if="model.body.mode == 3">
    <!-- 需要引入json格式化工具 -->
    <Monaco ref="monacoEditRef" style="height: 420px" v-model:value="state.rawData" v-model:lang="state.lang"/>
  </div>
  <!---------------------------raw------------------------------------>
  <div class="body-style" v-if="model.body.mode == 4">
    <Monaco ref="monacoEditRef" style="height: 420px" v-model:value="state.rawData" v-model:lang="state.lang"/>
  </div>
</template>


<style lang="less" scoped>
.body-style {
  text-align: center;
  border-radius: 4px;
  border: 1px solid rgb(230, 230, 230);
  color: darkgray;

  &.none {
    height: 100px;
    line-height: 100px;
  }
}
</style>