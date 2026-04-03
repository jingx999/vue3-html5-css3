<script setup lang="ts"></script>

<template>
  <div class="admin-layout">
    <!-- 顶部导航栏 -->
    <header class="layout-header">
      <div class="header-logo">
        <i class="iconfont icon-pingtai"></i>企业后台管理系统
      </div>
      <div class="header-info">
        <span>管理员: admin</span>
        <button class="logout-btn">
          <i class="iconfont icon-tuichu1"></i>退出
        </button>
      </div>
    </header>
    <!-- 主体内容区域 -->
    <div class="layout-body">
      <!-- 左侧侧边栏 -->
      <aside class="layout-aside">
        <nav class="sidebar-menu">
          <router-link to="/" class="menu-item" :active-class="active">
            <i class="iconfont icon-cangchucangku"></i>首页概览
          </router-link>
          <router-link to="/user" class="menu-item" active-class="active">
            <i class="iconfont icon-user"></i>用户管理
          </router-link>
          <router-link to="/order" class="menu-item" active-class="active">
            <i class="icontfont icon-dingdan"></i>订单列表
          </router-link>
          <router-link to="/settings" class="menu-item" active-class="active">
            <i class="iconfont icon-guanli"></i>系统设置
          </router-link>
        </nav>
      </aside>

      <!-- 右侧主内容区域 -->
      <main class="layout-main">
        <div class="main-content">
          <router-view />
        </div>
      </main>
    </div>
  </div>
</template>

<style scoped>
/* 全局重置 */
* {
  box-sizing: border-box;
  margin:0;
  padding:0;
}


/* 布局容器 */
.admin-layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  background-color: #f0f2f5;
}

/* 顶部样式 */
.layout-header {
  height: 60px;
  background-color: #1890ff;
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.15);
  z-index: 10;
}

.header-logo {
  font-size: 20px;
  font-weight: bold;
  letter-spacing: 1px;
}

.header-info {
  display: flex;
  align-items: center;
  gap: 15px;
}

.logout-btn {
  background: transparent;
  border: 1px solid #fff;
  color: #fff;
  padding: 4px 12px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s;
}

.logout-btn:hover {
  background: #fff;
  color: #001529
}

/* 主体容器 */
.layout-body {
  display: flex;
  flex: 1;
  overflow: hidden;
}

/* 左侧边栏 */
.layout-aside {
  width: 240px;
  background-color: #fff;
  border-right: 1px solid #e8e8e8;
  overflow-y: auto;
  padding-top: 10px;
}

.sidebar-menu {
  display: flex;
  flex-direction: column;
}

.menu-item {
  padding: 15px 24px;
  text-decoration: none;
  color: #333;
  font-size: 15px;
  transition: background 0.3s, color 0.3s;
  border-left: 3px solid transparent;
  display: block; /* 让 router-link 像块级元素一样显示 */
}

.menu-item:hover {
  background-color: #e6f7ff;
  color: #1890ff;
}

.menu-item.active {
  background-color: #e6f7ff;
  color: #1890ff;
  border-left-color: #1890ff;
  font-weight: 500;
}

/* 右侧主内容区域 */
.layout-main {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
}

.main-content {
  background: #fff;
  padding: 24px;
  border-radius: 4px;
  box-shadow: 0 1px 4px rgba(0,21,41,0.08);
  min-height: calc(100vh - 120px);
}


.menu-item i,
.header-logo i,
.logout-btn i {
  vertical-align: middle;
  margin-right: 8px;
  font-size: 16px;
}

.header-logo i {
  font-size: 20px;
  margin-right: 10px;
}

.logout-btn {
  display: inline-flex;
  align-items: center;
}

</style>
