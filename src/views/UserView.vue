<script setup lang="ts">
import { ref } from 'vue'

// 模拟数据生成
const userList = ref([
  {
    id: 1001,
    name: '张伟',
    email: 'zhangwei@example.com',
    role: '超级管理员',
    status: 1,
    createTime: '2023-10-12',
  },
  {
    id: 1002,
    name: '李娜',
    email: 'lina@example.com',
    role: '普通用户',
    status: 1,
    createTime: '2023-10-15',
  },
  {
    id: 1003,
    name: '王强',
    email: 'wangqiang@example.com',
    role: '编辑',
    status: 0,
    createTime: '2023-11-01',
  },
  {
    id: 1004,
    name: '赵敏',
    email: 'zhaomin@example.com',
    role: '普通用户',
    status: 1,
    createTime: '2023-11-05',
  },
  {
    id: 1005,
    name: '刘洋',
    email: 'liuyang@example.com',
    role: '财务',
    status: 1,
    createTime: '2023-11-10',
  },
  {
    id: 1006,
    name: '陈杰',
    email: 'chenjie@example.com',
    role: '普通用户',
    status: 0,
    createTime: '2023-11-12',
  },
])
</script>

<template>
  <div class="user-manage-container">
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
          <input type="text" placeholder="请输入用户名" class="search-input" />
        </div>
        <div class="input-group">
          <label for="">手机号</label>
          <input type="text" placeholder="请输入手机号" class="search-input" />
        </div>
        <div class="input-group">
          <label for="">状态</label>
          <select name="" id="" class="search-select">
            <option value="">全部</option>
            <option value="1">启用</option>
            <option value="0">禁用</option>
          </select>
        </div>
        <button class="btn btn-primary">搜索</button>
        <button class="btn btn-default">重置</button>
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
            <th>邮箱</th>
            <th>角色</th>
            <th>状态</th>
            <th>注册时间</th>
            <th>操作</th>
            <th>手机号</th>
            <th>性别</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in userList" :key="user.id">
            <td><input type="checkbox" /></td>
            <td>{{ user.id }}</td>
            <td>
              <div class="user-info">
                <!-- <div class="avatar">{{user.name.charAt(0)}}</div> -->
                <span>{{ user.name }}</span>
              </div>
            </td>
            <td>{{ user.email }}</td>
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
    <div class="pagination">
      <div class="page-buttons">
        <button>上一页</button>
        <button class="active">1</button>
        <button>2</button>
        <button>3</button>
        <button>下一页</button>
      </div>
      <span>共计 100 条数据</span>
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
</style>
