import { defineStore } from 'pinia'
import instance from '../axios/index'
import { ElMessage } from 'element-plus'
const useHome = defineStore('home', {
  state: () => ({
    // 表单相关
    formLabelWidth: '140px',
    dialogFormVisible: false,
    // 接收的车辆信息
    data: [],
    // 控制删除方框的样式
    active: [],
    // 用户查询的车辆名
    vehicalName: '',
    // 需要删除的车辆信息
    deleteids: []
  }),
  getters: {},
  actions: {
    // 表单弹出框相关
    closeDialog () {
      this.dialogFormVisible = false
    },
    // 获取全部车辆数据
    async getAllVehical () {
      try {
        const res = await instance('/getAllVehical')
        this.data = await res.data
      } catch (error) {
        ElMessage.error(`请求有误：${error}`)
      }
    },
    // 获取特定车辆数据
    async getOneVehical () {
      // 检查参数是否为空
      if (!this.vehicalName) {
        ElMessage.warning('车辆名称不能为空')
        return
      }
      try {
        const res = await instance(`/getOneVehical/${this.vehicalName}`)
        this.data = res.data

        if (this.data.length === 0) {
          ElMessage.info('没有相关发现')
        } else {
          ElMessage.success(`您输入的车辆名称是: ${this.vehicalName}`)
        }
      } catch (error) {
        ElMessage.error(`请求有误：${error}`)
      }
      this.vehicalName = ''
      this.closeDialog()
    },
    // 车辆子选项删除控制
    deleteItem (index) {
      // 更新 active 数组
      this.active[index] = !this.active[index]
      if (this.active[index]) {
        this.deleteids.push(this.data[index].cid)
      } else {
        this.deleteids.splice(this.deleteids.indexOf(this.data[index].cid), 1)
      }
    },
    // 删除选中的车辆
    async deleteVehical () {
      // 检查参数
      if (this.deleteids.length === 0) {
        ElMessage.warning('至少勾选一个车辆进行删除')
        return
      }
      try {
        await instance.delete(`/deleteVehical/${this.deleteids.join(',')}`)

        for (const index of this.deleteids.reverse()) {
          this.data.splice(this.data.findIndex(item => item.cid === index), 1)
        }

        this.active = Array.from({ length: this.data.length }, () => false)
        this.deleteids = []

        ElMessage.success('删除成功')
      } catch (error) {
        ElMessage.error(`删除失败：${error}`)
      }
    }
  }
})
export default useHome
