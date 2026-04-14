<script setup>
import { ref, reactive } from 'vue'

// 模拟表单数据
const settings = reactive({
  siteTitle: '企业后台管理系统',
  siteSubtitle: '高效/简洁/安全',
  copyright: '© 2023 Alibaba Group. All rights reserved.',
})

const saveSettings = () => {
  // 模拟保存请求
  const btn = document.querySelector('.btn-primary')
  const originaltext = btn.innerText

  btn.innertext = '保存中...'
  btn.style.opacity = '0.7'
  setTimeout(() => {
    alert('配置已保存成功！')
    btn.innerText = originalText
    btn.style.opacity = '1'
  }, 800)
}
</script>
<template>
  <div class="settings-container">
    <!-- 顶部标题 -->
    <!-- <div class="page-header">
      <h2>系统设置</h2>
      <p class="breadcrumb">首页 / 系统管理 / 全部设置</p>
    </div> -->
    <div class="setting-content">
      <!-- 1.左侧导航菜单 -->
      <!-- <aside class="settings-nav">
        <a href="#basic" class="nav-item active">⚙️ 基本信息</a>
        <a href="#security" class="nav-item">🔒 安全设置</a>
        <a href="#notification" class="nav-item">🔔 通知配置</a>
        <a href="#theme" class="nav-item">🎨 界面外观</a>
      </aside> -->
      <!-- 2.右侧配置表单 -->
      <div class="settings-form-wrapper">
        <!-- 板块一:基本信息 -->
        <section id="basic" class="form-card">
          <div class="card-header">
            <h3>站点基本信息</h3>
            <span class="sub-text">配置网站的全局标题和描述</span>
          </div>
          <div class="card-body">
            <div class="form-row">
              <label for="" class="form-label">网站标题 <span class="required">*</span></label>
              <div class="form-control">
                <input type="text" v-model="settings.siteTitle" class="input-field" />
                <p class="help-text">将显示在浏览器标题栏和后台左上角</p>
              </div>
            </div>
            <div class="form-row">
              <label for="" class="form-label">网站副标题</label>
              <div class="form-control">
                <input
                  type="text"
                  v-model="settings.siteSubtitle"
                  class="input-field"
                  placeholder="例如: 企业级后台管理系统"
                />
              </div>
            </div>
            <div class="form-row">
              <label for="" class="form-label">版权信息</label>
              <div class="form-control">
                <input
                  type="text"
                  v-model="settings.copyright"
                  class="input-field"
                  placeholder="例如：© 2023 My Company"
                />
              </div>
            </div>
          </div>
        </section>
        <!-- 板块二:安全设置 -->
        <section id="security" class="form-card">
          <div class="card-header">
            <h3>安全与权限</h3>
            <span class="sub-text">管理密码策略与登录安全</span>
          </div>
          <div class="card-body">
            <div class="form-row">
              <label for="" aria-label="" class="form-label">密码强度策略</label>
              <div class="form-control">
                <select name="" id="" class="input-field">
                  <option value="">低（6位以上）</option>
                  <option value="" selected>中（8位，含字母数字）</option>
                  <option value="">高（10位，含特殊字符）</option>
                </select>
              </div>
            </div>
            <div class="form-row">
              <label for="" class="form-label">登录保护</label>
              <div class="form-control">
                <label for="" class="checkbox-label">
                  <input type="checkbox" checked />
                  <span class="checkmark"></span>
                  开启异地登录提醒
                </label>
                <label for="" class="checkbox-label">
                  <input type="checkbox" />
                  <span class="checkmark"></span>
                  强制开启两步验证(2FA)
                </label>
              </div>
            </div>
          </div>
        </section>
        <!-- 板块三:通知配置 -->
        <section id="notification" class="form-card">
          <div class="card-header">
            <h3>通知配置</h3>
            <span class="sub-text">配置系统消息的推送方式</span>
          </div>
          <div class="card-body">
            <div class="form-row">
              <label for="" class="form-label">邮件服务(SMTP)</label>
              <div class="control">
                <div class="toggle-switch">
                  <input type="checkbox" id="email-toggle" />
                  <label for="email-toggle" class="toggle-label"></label>
                </div>
                <span class="toggle-text">开启邮件通知</span>
              </div>
            </div>
            <div class="form-row">
              <label for="" class="form-label">管理员邮箱</label>
              <div class="form-control">
                <input type="email" value="admin@example.com" class="input-field" />
              </div>
            </div>
          </div>
        </section>
        <!-- 板块四:界面外观 -->
        <section id="theme" class="form-card">
          <div class="card-header">
            <h3>界面外观</h3>
            <span class="sub-text">自定义后台的主题色</span>
          </div>
          <div class="card-body">
            <div class="form-row">
              <label for="" class="form-label">品牌主色调</label>
              <div class="form-control">
                <div class="color-picker-group">
                  <div class="color-dot active" style="background: #1890ff" title="默认蓝"></div>
                  <div class="color-dot" style="background: #52c41a" title="极光绿"></div>
                  <div class="color-dot" style="background: #722ed1" title="酱紫"></div>
                  <div class="color-dot" style="background: #fa541c" title="火焰橙"></div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <!-- 底部保存按钮 -->
        <div class="form-actions">
          <div class="btn btn-primary" @click="saveSettings">💾 保存配置</div>
          <div class="btn btn-default">↺ 重置</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 布局容器 */
.settings-container {
  padding: 20px;
  background-color: #f0f2f5;
  min-height: 100%;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

/* 头部 */
.page-header {
  margin-bottom: 24px;
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

/* 左右分栏布局 */
.settings-container {
  display: flex;
  gap: 24px;
  align-items: flex-start;
}

.settings-nav {
  width: 200px;
  background: #fff;
  border-radius: 4px;
  padding: 16px 0;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
  position: sticky;
  top: 20px;
}

.nav-item {
  display: block;
  padding: 12px 24px;
  color: #555;
  text-decoration: none;
  font-size: 14px;
  border-left: 3px solid transparent;
  transition: all 0.3s;
}

.nav-item:hover {
  background: #fafafa;
  color: #1890ff;
}

.nav-item.active {
  background: #e6f7ff;
  color: #1890ff;
  border-left-color: #1890ff;
  font-weight: 500;
}

/* 右侧表单区域 */
.settings-form-wrapper {
  flex: 1;
}

/* 卡片通用样式 */
.form-card {
  background: #fff;
  border-radius: 4px;
  margin-bottom: 24px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
  overflow: hidden;
}

.card-header {
  padding: 16px 24px;
  border-bottom: 1px solid #f0f0f0;
  display: flex;
  align-items: center;
  gap: 12px;
}

.card-header h3 {
  margin: 0;
  font-size: 16px;
  color: #333;
}

.sub-text {
  font-size: 12px;
  color: #999;
  font-weight: normal;
}

.card-body {
  padding: 24px;
}

/* 表单行样式 */
.form-row {
  display: flex;
  margin-bottom: 24px;
  align-items: flex-start;
}

.form-label {
  width: 140px;
  padding-top: 8px;
  font-size: 14px;
  color: #333;
  /* text-align: right: */
  flex-shrink: 0;
}

.required {
  color: #ff4d4f;
  margin-left: 4px;
}

.form-control {
  flex: 1;
  padding-left: 16px;
}

.input-field {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  font-size: 14px;
  transition: all 0.3s;
  box-sizing: border-box;
}

.input-field:focus {
  border-color: #1890ff;
  box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
  outline: none;
}

.help-text {
  margin: 4px 0 0;
  font-size: 12px;
  color: #999;
}

/* 复选框美化 */
.check-box-label {
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  cursor: pointer;
  font-size: 14px;
  color: #333;
}

.checkbox-label input {
  margin-right: 8px;
  width: 16px;
  height: 16px;
  cursor: pointer;
}

/* 开关 Toggle Switch */
.toggle-switch {
  display: inline-block;
}

.toggle-label {
  position: relative;
  display: inline-block;
  width: 44px;
  height: 22px;
  background-color: #ccc;
  border-radius: 11px;
  transition: 0.3s;
  cursor: pointer;
}

.toggle-label::after {
  content: '';
  position: absolute;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #fff;
  top: 2px;
  left: 2px;
  transition: 0.3s;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

#email-toggle:checked + .toggle-label {
  background-color: #52c41a;
}

#email-toggle:checked + .toggle-label::after {
  transform: translateX(22px);
}

.toggle-text {
  margin-left: 12px;
  font-size: 14px;
  color: #555;
  vertical-align: middle;
}

/* 颜色选择器 */
.color-picker-group {
  display: flex;
  gap: 16px;
}
.color-dot {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  cursor: pointer;
  border: 2px solid #fff;
  box-shadow: 0 0 0 1px #e8e8e8;
  transition: all 0.3s;
}

.color-dot:hover {
  transition: scale(1.1);
}

.color-dot.active {
  box-shadow: 0 0 0 2px #1890ff;
  transform: scale(1.1);
}

/* 底部按钮 */
.form-actions {
  padding-left: 156px;
  margin-top: 20px;
  display: flex;
  gap: 12px;
}

.btn {
  padding: 8px 20px;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-primary {
  background: #1890ff;
  color: #fff;
  border: none;
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

/* 响应式配置 */
@media (max-width: 768px) {
  .settings-content {
    flex-direction: column;
  }
  .settings-nav {
    width: 100%;
    display: flex;
    overflow-x: auto;
    padding: 0;
  }
  .nav-item {
    border-left: none;
    border-bottom: 3px solid transparent;
    white-space: nowrap;
  }
  .form-row {
    flex-direction: column;
  }
  .form-label {
    text-align: left;
    width: 100%;
    margin-bottom: 8px;
  }
  .form-control {
    padding-left: 0;
  }
  .form-actions {
    padding-left: 0;
  }
}
</style>
