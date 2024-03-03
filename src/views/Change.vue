<template>
  <div class="nav"></div>
  <div class="change">
    <h1>修 改 页 面</h1>
    <div class="content">
      <el-form :model="subVehical" :label-position="labelPosition" label-color="white" :rules="rules" ref="form">
        <el-form-item label="车辆ID" prop="cid">
          <el-input v-model.number="subVehical.cid" disabled/>
        </el-form-item>
        <el-form-item label="车辆名称" prop="cname">
          <el-input v-model.trim="subVehical.cname"/>
        </el-form-item>
        <el-form-item label="车辆颜色" prop="ccolor">
          <el-input v-model.trim="subVehical.ccolor"/>
        </el-form-item>
        <el-form-item label="车价" prop="cprice">
          <el-input v-model.number="subVehical.cprice"/>
        </el-form-item>
        <el-form-item label="车龄" prop="cage">
          <el-input v-model.number="subVehical.cage"/>
        </el-form-item>
      </el-form>
      <div id="button">
        <el-button @click="changeVehical(form)" class="upgrade">修改</el-button>
        <router-link to="/home">
          <el-button  class="return">返回</el-button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import instance from '../axios/index'
import { useRoute } from 'vue-router'
const route = useRoute()
const labelPosition = ref('left')
const subVehical = reactive({
  cid: parseInt(route.query.cid) ?? '',
  cname: route.query.cname.trim() ?? '',
  ccolor: route.query.ccolor.trim() ?? '',
  cprice: parseInt(route.query.cprice) ?? '',
  cage: parseInt(route.query.cage) ?? ''
})
// 表单ref
const form = ref()
// rules规则
const rules = reactive({
  cid: [
    { type: 'number', required: true, message: '车辆ID必填，且只能输入数字', trigger: 'blur' },
    { pattern: /^\d{1,3}$/, message: '车辆ID范围：1-999', trigger: 'blur' }
  ],
  cname: [
    { type: 'string', required: true, message: '车辆名称必填', trigger: 'blur' },
    { pattern: /^Car\d{1,3}$/, message: '车辆名以Car开头，后跟数字，整体长度不能超过6', trigger: 'blur' }
  ],
  ccolor: [
    { type: 'string', required: true, message: '车辆颜色必填', trigger: 'blur' },
    { max: 6, message: '车辆颜色名称长度不能超过6', trigger: 'blur' }
  ],
  cprice: [
    { type: 'number', required: true, message: '车价必填，且只能输入数字', trigger: 'blur' },
    { pattern: /^\d{1,3}$/, message: '车价范围：1-999', trigger: 'blur' }
  ],
  cage: [
    { type: 'number', required: true, message: '车龄必填，且只能输入数字', trigger: 'blur' },
    { pattern: /^\d{1,2}$/, message: '车龄范围：1-99', trigger: 'blur' }
  ]
})
// 发送修改请求
// 表单提交，添加新车辆
const changeVehical = async (formEl) => {
  if (!formEl) return
  await formEl.validate((valid) => {
    if (valid) {
      instance.put('/upgradeVehical', subVehical).then(_res => {
        ElMessage.success(`成功更新车辆：${subVehical.cname}`)
      }).catch(_error => {
        ElMessage.error('车辆不存在，请检查你的输入')
      })
      subVehical.cid = subVehical.cname = subVehical.ccolor = subVehical.cprice = subVehical.cage = ''
    } else {
      ElMessage.error('所有字段都必须满足约束')
    }
  })
}
</script>

<style scoped>
.nav {
  float: left;
  width: 9%;
  height: 100vh;
  background-color: rgb(12, 74, 140);
}
.change {
  float: left;
  box-sizing: border-box;
  width: 91%;
  height: 100vh;
  padding-left: 5%;
}
.content {
  margin-top: 10vh;
  margin-left: 20vw;
  padding: 2vw;
  padding-top: 10vh;
  width: 40vw;
  max-height: 40vh;
  overflow: auto;
}
</style>
