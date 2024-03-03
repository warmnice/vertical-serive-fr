<template>
 <div class="index">
    <h1>车 辆 管 理 页 面</h1>
     <div class="main">
        <div class="buttons">
          <!-- Form -->
          <el-button class="select" @click="dialogFormVisible = true">
            查询
          </el-button>

          <el-dialog v-model="dialogFormVisible" title="请输入汽车名称" id="dialog">
            <el-form>
              <el-form-item label="汽车名称" :label-width="formLabelWidth">
                <el-input v-model="vehicalName" autocomplete="off" />
              </el-form-item>
            </el-form>
            <template #footer>
              <span>
                <el-button @click="dialogFormVisible = false">取消</el-button>
                <el-button @click="dialogFormVisible = false, getOneVehical()">
                  确认
                </el-button>
              </span>
            </template>
          </el-dialog>
          <el-button @click="deleteVehical()" class="delete" :class="{ 'show' : dialogFormVisible }">删除</el-button>
        </div>
        <div class="nav display">
          <img src="../assets/note.png" alt="">
          <span>车辆ID</span>
          <span>车辆名称</span>
          <span>车身颜色</span>
          <span>车价</span>
          <span>车龄</span>
          <span>修改</span>
          <span>删除</span>
          <hr>
        </div>
    </div>
    <div class="content">
      <ul class="display">
        <li v-for="(item, index) in data" :key="item.cid" >
          <span>{{item.cid}}</span>
          <span>{{item.cname}}</span>
          <span>{{item.ccolor}}</span>
          <span>{{item.cprice}} </span>
          <span>{{item.cage}}</span>
          <span><router-link :to="{ path: '/change' , query: { cid: item.cid, cname: item.cname, ccolor: item.ccolor, cprice: item.cprice, cage: item.cage } }" id="change">选择</router-link></span>
          <span>
            <a href="#" @click.prevent="deleteItem(index)" class="deletes" >
              <img src="../assets/right.png" v-show="active[index]">
            </a>
          </span>
          <hr>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import 'element-plus/theme-chalk/base.css'
import useHome from '../store/home'
import { storeToRefs } from 'pinia'
const homeStore = useHome()
const { data, dialogFormVisible, formLabelWidth, vehicalName, active } = storeToRefs(homeStore)
// 获取全部车辆数
homeStore.getAllVehical()
// 获取特定车辆数据
function getOneVehical () {
  homeStore.getOneVehical()
}
// 车辆子选项删除控制
function deleteItem (index) {
  homeStore.deleteItem(index)
}
// 删除选中的车辆
function deleteVehical () {
  homeStore.deleteVehical()
}
</script>

<style scoped>
.index {
  width: 60%;
  background-color: white;
}
.main {
  margin-top: 10vh;
}
.buttons {
  position: relative;
  height: 8vh;
  z-index: 2000;
}
.buttons button , #change{
  border-width: 0;
  border-top-left-radius: 30% 60%;
  border-top-right-radius: 30% 60%;
  border-bottom-left-radius: 30% 60%;
  border-bottom-right-radius: 30% 60%;
  color: white;
  background-color: rgb(12, 74, 140);
}
.buttons > button {
  position: absolute;
  display: inline-block;
  top: 2vh;
  width: 5vw;
  height: 4vh;
  padding: 1vh 1.1vw;
  font-size: 2vh;
  letter-spacing: 1vw;
}
#dialog {
  z-index: 1000;
}
.select {
  right: 6vw;
}
.select:hover {
  opacity: 1;
  visibility: 1;
}
.delete {
  right: 0;
}
.show {
  z-index: -1;
}
.nav img {
  position: relative;
  width: 3vh;
  height: 3vh;
  margin-right: 0.1vw;
  top: 0.7vh;
}

.content {
  height: 55vh;
  overflow-x: hidden;
}
.display span:nth-child(n + 1) {
  display: inline-block;
  width: 6vw;
  margin: 0 0.6vw;
  font-size: 0.9vw;
  text-align: center;
}
ul {
  margin: 0;
  padding: 0;
  width: 100%;
  max-height: 55vh;
  list-style: none;
}
ul li::before {
  content: "\2022";
  position: relative;
  bottom: 0.8vh;
  line-height: 1vh;
  font-size: 3.8vw;
  vertical-align: middle;
}
#change {
  display: inline-block;
  width: 3.5vw;
  padding: 2% 0;
  color: white;
  text-decoration: none;
  font-size: 0.8vw;
  letter-spacing: 0.3vw;
  text-indent: 0.2vw;
}
.deletes {
  display: inline-block;
  position: relative;
  top: 0.5vh;
  width: 2vh;
  height: 2vh;
  border: 0.1vh solid black;
  overflow: hidden;
}
.deletes img {
  width: 90%;
  height: 90%;
}
</style>
