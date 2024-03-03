<template>
  <div class="add">
    <h1>添 加 页 面</h1>
    <form @submit.prevent="addVehical()" >
      <ul class="form">
         <li>
           <label for="name">车辆名称</label>
           <input v-model.trim="newVehical.carName" type="text" id="name" name="car_name" @blur="validName()"/>
          </li>
         <li>
           <label for="color">车身颜色</label>
           <input v-model.trim="newVehical.carColor" type="text" id="color" name="car_color" @blur="validColor()"/>
          </li>
         <li>
           <label for="price">车价</label>
           <input v-model.trim="newVehical.carPrice" id="price" name="car_price" @blur="validPrice()">
          </li>
         <li>
           <label for="age">车龄</label>
           <input v-model.trim="newVehical.carAge" id="age" name="car_age" @blur="validAge()">
          </li>
         <li>
          <button type="submit">确定</button>
         </li>
      </ul>
    </form>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import instance from '../axios/index'
import { ElMessage } from 'element-plus'
import 'element-plus/theme-chalk/el-message.css'
// 收集表单数据
const newVehical = reactive({
  carName: '',
  carColor: '',
  carPrice: '',
  carAge: ''
})
// 记录每个表单子项是否符合要求
const items = ref(Array.from({ length: 4 }, () => false))
// 表单单项输入数据校验
function validName () {
  const pattern = /^Car\d{1,3}$/ // 以"Car"开头，后跟1到3个数字
  if (newVehical.carName.length > 6 || !pattern.test(newVehical.carName)) {
    ElMessage.warning('车辆名以Car开头，后跟数字，整体长度不能超过6')
    items.value[0] = false
  } else {
    items.value[0] = true
  }
}
function validColor () {
  if (newVehical.carColor.length > 6) {
    ElMessage.warning('颜色长度不能超过6')
    items.value[1] = false
  } else {
    items.value[1] = true
  }
}
function validPrice () {
  const pattern = /^\d{1,3}$/
  if (!pattern.test(newVehical.carPrice)) {
    ElMessage.warning('价格：1 - 999')
    items.value[2] = false
  } else {
    newVehical.carPrice = parseInt(newVehical.carPrice)
    items.value[2] = true
  }
}
function validAge () {
  const pattern = /^\d{1,2}$/
  if (!pattern.test(newVehical.carAge)) {
    ElMessage.warning('车龄：1 - 99')
    items.value[3] = false
  } else {
    newVehical.carAge = parseInt(newVehical.carAge)
    items.value[3] = true
  }
}
// 表单提交，添加新车辆
function addVehical () {
  // 检查参数是否为空
  if (newVehical.carName === '' || newVehical.carColor === '' || newVehical.carPrice === '' || newVehical.carAge === '') {
    ElMessage.warning('需填写全部表单项')
    return
  }
  if (!items.value.every(item => item === true)) {
    ElMessage.warning('全部表单项必须符合填写要求')
    return
  }
  instance.post('/addVehical', newVehical).then(_res => {
    const temp = newVehical.carName
    ElMessage.success(`成功添加车辆：${temp}`)
  }).catch(_error => {
    ElMessage.error('车辆已存在')
  })
  newVehical.carName = newVehical.carColor = newVehical.carPrice = newVehical.carAge = ''
}
</script>

<style scoped>
.add {
  background-color: rgb(44, 147, 226);
}
.form {
  margin: 0;
  margin-top: 20vh;
  padding: 0;
  width: 30vw;
  list-style: none;
}
.form li {
  position: relative;
  margin-top: 3vh;
  font-size: 4vh;
}
.form li:nth-child(n+3){
  letter-spacing: 2vw;
}
.form input, button {
  border-width: 0;
  border-top-left-radius: 10% 60%;
  border-top-right-radius: 10% 60%;
  border-bottom-left-radius: 10% 60%;
  border-bottom-right-radius: 10% 60%;
}
.form input {
  position: absolute;
  right: 0;
  bottom: 0;
  width: 65%;
  height: 6vh;
  padding-left: 1vw;
}
.form input:focus {
  outline: none;
}
.form button {
  display: inline-block;
  margin-top: 5%;
  width: 100%;
  height: 8vh;
  background-color: rgb(12, 74, 140);
  font-size: 4vh;
  color: white;
  letter-spacing: 8vw;
  text-indent: 25%;
}
</style>

