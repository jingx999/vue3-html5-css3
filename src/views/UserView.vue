<script setup lang="ts">
import { ref, onMounted, computed, reactive } from 'vue'
import axios from 'axios'
import PinyinMatch from 'pinyin-match'
// import { Pinyinmatch } from 'pinyin-match'

// 这里是所有用户数据
const userList = ref([])
// 当前页码标记
const currentPage = ref(1)
// 默认状态下的每页数据条目
const pageSize = ref(10)
// 定义 ref 获取 DOM 元素
const mainContainer = ref(null)

// 定义响应式参数
const searchForm = reactive({
  keyword: '',
  phone: '',
  status: '',
})

// 获取所有用户的数据
const getUserList = async () => {
  try {
    // 构建查询参数
    const params = {
      keyword: searchForm.keyword,
      phone: searchForm.phone,
      status: searchForm.status,
    }
    console.log(params, '3434334343')
    const res = await axios.get('/api/user/list', { params })
    console.log(res, '898989899898')

    if (res.data.code === 200) {
      userList.value = res.data.data
    }
  } catch (error) {
    console.log('用户数据请求失败', error)
  }
}

// 搜索操作
const handleSearch = () => {
  getUserList()
}
// 重置操作
const handleReset = () => {
  ;((searchForm.keyword = ''), (searchForm.phone = ''), (searchForm.status = ''))
  getUserList()
}

// 核心分页逻辑
// 总条数
const totalUsers = computed(() => {
  return userList.value.length
})

// 总页数
const totalPages = computed(() => Math.ceil(totalUsers.value / pageSize.value))

// 当前页展示的数据(切片逻辑)
const currentData = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  const end = start + pageSize.value
  return userList.value.slice(start, end)
})

// 事件处理
const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
    // 添加滚动到顶部的逻辑
    // 滚动到顶部未生效
    // window.scrollTo({ top: 0, behavior: 'smooth' })
    setTimeout(() => {
      if (mainContainer.value) {
        mainContainer.value.scrollTop = 0
      }
    }, 0)
  }
}

// 前一页
const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

// 下一页
const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

// 切换每页展示的条数
const handlePageSizeChange = () => {
  // 切换条数之后,通常重置回第一页
  currentPage.value = 1
}

// 计算可见页码
const visiblePages = computed(() => {
  const total = totalPages.value
  const current = currentPage.value
  const delta = 2

  // console.log(total, current, '1111111111122222')

  // 如果总页数小于等于 7,直接返回所有页码
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1)
  }

  const range = []
  // 始终包含首页
  range.push(1)

  // 计算当前页码附近的范围
  // 确保当前页在中间,左右各保留 delta 个页码
  const start = ref(Math.max(current - delta, 2))
  const end = ref(Math.min(current + delta, total - 1))

  // 处理省略号与边界情况
  // 如果当前页码靠近头部
  // 此时的计算的 start 可能是 2,此时不需要前面的省略号
  if (current <= 4) {
    end.value = Math.min(total - 1, 5)
  }

  // 如果当前页码靠近尾部
  // 此时 end 可能是 total-1,不需要后面的省略号
  else if (current >= total - 3) {
    start.value = Math.max(2, total - 5)
  }

  // 组装数组
  // 添加前面的省略号
  if (start.value > 2) {
    range.push('...')
  }
  // 添加中间的数字
  for (let i = start; i.value <= end.value; i.value++) {
    range.push(i.value)
  }
  // 添加后面的省略号
  if (end.value < total - 1) {
    range.push('...')
  }
  // 始终包含末页
  range.push(total)

  // console.log(start.value, end.value, '---------------')
  // console.log(range, '......')
  return range
})

onMounted(() => {
  getUserList()
})
</script>

<template>
  <div class="user-manage-container" ref="mainContainer">
    <!-- 顶部面包屑与标题 -->
    <div class="page-header">
      <h2>用户管理</h2>
      <p class="breadcrumb">首页/用户中心/用户列表</p>
    </div>

    <!-- 搜索与筛选栏 -->
    <div class="filter-card">
      <div class="filter-row">
        <div class="input-group">
          <label for="">用户名</label>
          <input
            type="text"
            v-model="searchForm.keyword"
            placeholder="支持拼音/汉字搜索"
            class="search-input"
          />
        </div>
        <div class="input-group">
          <label for="">手机号</label>
          <input
            type="text"
            v-model="searchForm.phone"
            placeholder="请输入手机号"
            class="search-input"
          />
        </div>
        <div class="input-group">
          <label for="">状态</label>
          <select name="" id="" v-model="searchForm.status" class="search-select">
            <option value="">全部</option>
            <option value="1">启用</option>
            <option value="0">禁用</option>
          </select>
        </div>
        <button class="btn btn-primary" @click="handleSearch">搜索</button>
        <button class="btn btn-default" @click="handleReset">重置</button>
      </div>
    </div>

    <!-- 表格操作栏 -->
    <div class="table-toolbar">
      <div class="toolbar-left">
        <button class="btn btn-success">新增用户</button>
        <button class="btn btn-danger">批量操作</button>
      </div>
      <div class="toolbar-right">
        <button class="btn btn-text">导出</button>
        <button class="btn btn-text">列设置</button>
      </div>
    </div>
    <!-- 表格展示栏 -->
    <div class="table-wrapper">
      <table class="table-data">
        <thead>
          <tr>
            <th style="width: 50px"><input type="checkbox" /></th>
            <th>用户ID</th>
            <th>用户名</th>
            <th>性别</th>
            <th>邮箱</th>
            <th>手机号</th>
            <th>角色</th>
            <th>状态</th>
            <th>注册时间</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <!-- 如果数据为空 -->
          <tr v-if="currentData.length === 0">
            <td colspan="8" class="empty-data">暂无数据</td>
          </tr>
          <!-- 渲染当前页面内容 -->
          <tr v-for="user in currentData" :key="user.id">
            <td><input type="checkbox" /></td>
            <td>{{ user.id }}</td>
            <td>
              <div class="user-info">
                <!-- <div class="avatar">{{user.name.charAt(0)}}</div> -->
                <span>{{ user.name }}</span>
              </div>
            </td>
            <td>{{ user.gender }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.phone }}</td>
            <td>
              <span class="role-tag">{{ user.role }}</span>
            </td>
            <td>
              <span
                class="status-badge"
                :class="user.status === 1 ? 'status-active' : 'status-inactive'"
              >
                {{ user.status === 1 ? '启用' : '禁用' }}
              </span>
            </td>
            <td>{{ user.createTime }}</td>
            <td>
              <a href="" class="action-link">编辑</a>
              <a href="" class="action-link">删除</a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- 分页 -->
    <!-- <div class="pagination">
      <div class="page-buttons">
        <button>上一页</button>
        <button class="active">1</button>
        <button>2</button>
        <button>3</button>
        <button>下一页</button>
      </div>
      <span>共计 {{ totalUsers }} 条数据</span>
    </div> -->

    <!-- 底部操作栏 -->
    <div class="pagination-bar">
      <div class="page-controls">
        <!-- 翻页按钮 -->
        <div class="page-buttons">
          <button @click="prevPage" :disabled="currentPage === 1">上一页</button>
          <!-- <button
            v-for="page in totalPages"
            :key="page"
            @click="goToPage(page)"
            :class="{ active: currentPage === page }"
          >
            {{ page }}
          </button> -->
          <!-- 动态页码表 -->
          <template v-for="(page, index) in visiblePages" :key="index">
            <span v-if="page === '...'" class="page-ellipsis">...</span>
            <button v-else @click="goToPage(page)" :class="{ active: currentPage === page }">
              {{ page }}
            </button>
          </template>
          <button @click="nextPage" :disabled="currentPage === totalPages">下一页</button>
        </div>
        <!-- 每页条目选择 -->
        <div class="page-size-selector">
          <span>每页展示</span>
          <select
            name=""
            id=""
            v-model="pageSize"
            @change="handlePageSizeChange"
            class="page-size-select"
          >
            <option :value="10">10 页</option>
            <option :value="30">30 页</option>
            <option :value="50">50 页</option>
            <option :value="100">100 页</option>
          </select>
        </div>
      </div>
      <div class="page-info">
        共计 <strong>{{ totalUsers }}</strong> 条数据
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 容器基础样式 */
.user-manage-container {
  padding: 20px;
  background-color: #f0f2f5;
  min-height: 100%;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

/* 页面标题栏 */
.page-header {
  margin-bottom: 20px;
}

.page-header h2 {
  margin: 0;
  font-size: 24px;
  color: #333;
}

.breadcrumb {
  margin-top: 8px;
  font-size: 12px;
  color: #999;
}

/* 表格操作卡片区域 */
.filter-card {
  background: #fff;
  padding: 20px;
  border-radius: 4px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
  margin-bottom: 16px;
}

.filter-row {
  display: flex;
  gap: 16px;
  align-items: center;
  flex-wrap: wrap;
}

.input-group {
  display: flex;
  align-items: center;
  gap: 8px;
}

.input-group label {
  font-size: 14px;
  color: #555;
  white-space: nowrap;
}

.search-input,
.search-select {
  padding: 8px 20px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  width: 200px;
  outline: none;
  transition: border-color 0.3s;
}

.search-input:focus,
.search-select:focus {
  border-color: #1890ff;
}

/* 表格工具区域 */
.table-toolbar {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

/* 表格内容样式 */
.table-wrapper {
  background: #fff;
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
}

.table-data {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
}

.table-data th {
  background: #fafafa;
  padding: 12px 20px;
  font-weight: 600;
  color: #333;
  border-bottom: 1px solid #f0f0f0;
  font-size: 14px;
}

.table-data td {
  padding: 16px 20px;
  border-bottom: 1px solid #f0f0f0;
  color: #555;
  font-size: 14px;
}

.table-data tr:hover {
  background: #fafafa;
}

/* 表格内的组件样式 */
.user-info {
  display: flex;
  align-items: center;
  gap: 10px;
}

.role-tag {
  background: #e6f7f7;
  color: #1890ff;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 12px;
}

.status-badge {
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 12px;
}

.status-inactive {
  background: #fff2f0;
  color: #ff4d4f;
  border: 1px solid #ffccc7;
}

.action-link {
  color: #1890ff;
  font-size: 12px;
  text-decoration: none;
  margin-right: 12px;
}

.action-link:hover {
  color: #40a9ff;
}

/* 分页 */
.pagination {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  color: #555;
  font-size: 14px;
}

.page-buttons {
  display: flex;
  gap: 8px;
}

.page-buttons button {
  padding: 6px 12px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  background: #fff;
  cursor: pointer;
}

.page-buttons button.active {
  background: #1890ff;
  color: #fff;
  border-color: #1890ff;
}

/* 按钮通用样式 */
.btn {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3;
  font-size: 14px;
}

.btn-primary {
  background: #1890ff;
  color: #fff;
}

.btn-primary:hover {
  background: #40a9ff;
}

.btn-default {
  background: #fff;
  border: 1px solid #d9d9d9;
  color: #555;
}

.btn-default:hover {
  color: #1890ff;
  border-color: #1890ff;
}

.btn-success {
  background: #52c41a;
  color: #fff;
}

.btn-success:hover {
  background: #73d13d;
}

.btn-danger {
  background: #ff4d4f;
  color: #fff;
}

.btn-danger:hover {
  background: #ff7875;
}

.btn-text {
  background: transparent;
  color: #1890ff;
}

.btn-text:hover {
  color: #40a9ff;
}

/* 底部翻页栏样式优化 */
.pagination-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  background: #fff;
  padding: 16px 20px;
  border-radius: 4px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
}

.page-controls {
  display: flex;
  align-items: center;
  gap: 20px;
}

.page-size-selector {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #666;
}

.page-size-select {
  padding: 4px 8px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
}

/* 翻页按钮组 */
.page-buttons {
  display: flex;
  gap: 4px;
}

.page-buttons button,
.page-ellipsis {
  min-width: 32px;
  height: 32px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: #555;
  background: #fff;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s;
  user-select: none;
}

/* 按钮悬停效果 */
.page-buttons button:hover:not(:disabled):not(.active) {
  border-color: #1890ff;
  color: #1890ff;
}

/* 激活状态 */
.page-buttons button.active {
  background: #1890ff;
  color: #fff;
  border-color: #1890ff;
  font-size: 500;
}

/* 禁用状态 */
.page-buttons button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  background: #f5f5f5;
}

/* 省略号样式 */
.page-ellipsis {
  cursor: default;
  border: none;
  background: transparent;
  color: #999;
  padding: 0 4px;
  letter-spacing: 1px;
}
</style>
