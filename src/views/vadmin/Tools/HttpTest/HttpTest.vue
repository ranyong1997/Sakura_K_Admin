<script setup lang="tsx">
import { ContentWrap } from '@/components/ContentWrap'
import { ref } from 'vue'
import { ElInput, ElSelect, ElOption, ElButton } from 'element-plus';
let input3 = ref('')
let select = ref('')

</script>


<template>
    <ContentWrap>
        <el-input v-model="input3" style="max-width: 600px" placeholder="Please input" class="input-with-select">
            <template #prepend>
                <el-select v-model="select" placeholder="Select" style="width: 115px">
                    <el-option label="Restaurant" value="1" />
                    <el-option label="Order No." value="2" />
                    <el-option label="Tel" value="3" />
                </el-select>
            </template>
            <template #append>
                <el-button>btn</el-button>
            </template>
        </el-input>
    </ContentWrap>
</template>


<style lang="less" scoped></style>