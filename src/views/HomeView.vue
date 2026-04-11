<script setup lang="ts"></script>
<template>
  <div class="dashboard-container">
    <!-- 1.欢迎语与快捷入口 -->
    <div class="welcome-section">
      <div class="welcome-text">
        <h2>早安，Admin！👋</h2>
        <p>今日天气晴朗，气温 24°C，当前系统运行正常。</p>
      </div>
      <div class="quick-actions">
        <button class="action-btn"><i class="iconfont icon-yonghu"></i>新增用户</button>
        <button class="action-btn"><i class="iconfont icon-dingdan"></i>创建订单</button>
        <button class="action-btn"><i class="iconfont icon-shezhi"></i>系统设置</button>
      </div>
    </div>
    <!-- 2.核心数据卡片 -->
    <div class="stats-grid">
      <div class="stat-card blue">
        <div class="stat-header">
          <span class="stat-title">总销售额</span>
          <i class="iconfont icon-qianbao icon-bg"></i>
        </div>
        <div class="stat-value">¥ 126,560</div>
        <div class="stat-trend up"><i class="iconfont icon-shangsheng"></i> 12% 较昨日</div>
      </div>
      <div class="stat-card green">
        <div class="stat-header">
          <span class="stat-title">新增用户</span>
          <i class="iconfont icon-yonghu icon-bg"></i>
        </div>
        <div class="stat-value">1,234</div>
        <div class="stat-trend up"><i class="iconfont icon-shangsheng"></i> 8% 较昨日</div>
      </div>
      <div class="stat-card orange">
        <div class="stat-header">
          <span class="stat-title">待处理订单</span>
          <i class="iconfont icon-dingdan icon-bg"></i>
        </div>
        <div class="stat-value">36</div>
        <div class="stat-trend down"><i class="iconfont icon-xiajiang"></i> 2% 较昨日</div>
      </div>
      <div class="stat-card purple">
        <div class="stat-header">
          <span class="stat-title">系统消息</span>
          <i class="iconfont icon-tongzhi icon-bg"></i>
        </div>
        <div class="stat-value">12</div>
        <div class="stat-trend">5条未读</div>
      </div>
    </div>

    <!-- 3.图表区域 -->
    <div class="charts-section">
      <!-- 左侧折线图 -->
      <div class="chart-card main-chart">
        <div class="card-header">
          <h3>销售趋势分析</h3>
          <select class="time-select" name="" id="">
            <option value="">近 7 天</option>
            <option value="">近 30 天</option>
          </select>
        </div>
        <div class="chart-body">
          <!-- 使用 CSS 模拟一个折线图效果 -->
          <div class="mock-line-chart">
            <div class="chart-line" style="height: 40%"></div>
            <div class="chart-line" style="height: 60%"></div>
            <div class="chart-line" style="height: 45%"></div>
            <div class="chart-line" style="height: 80%"></div>
            <div class="chart-line" style="height: 55%"></div>
            <div class="chart-line" style="height: 90%"></div>
            <div class="chart-line" style="height: 70%"></div>
          </div>
          <div class="chart-labels">
            <span>周一</span><span>周二</span><span>周三</span><span>周四</span><span>周五</span
            ><span>周六</span><span>周日</span>
          </div>
        </div>
      </div>
      <!-- 右侧饼图列表 -->
      <div class="chart-card side-chart">
        <div class="card-header">
          <h3>订单来源占比</h3>
        </div>
        <div class="chard-body">
          <div class="mock-pie-chart">
            <div class="pie-segment" style="--percent: 40; --color: #1890ff"></div>
            <div class="pie-segment" style="--percent: 30; --color: #52c41a"></div>
            <div class="pie-segment" style="--percent: 30; --color: #faad14"></div>
          </div>
          <div class="pie-legend">
            <div class="legend-item"><span class="dot blue"></span> PC端 (40%)</div>
            <div class="legend-item"><span class="dot green"></span> 移动端 (30%)</div>
            <div class="legend-item"><span class="dot orange"></span> 其他 (30%)</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 4.底部表格:最新订单 -->
    <div class="recent-orders">
      <div class="card-header">
        <h3>最新订单</h3>
        <a href="#" class="view-all">查看全部</a>
      </div>
      <table class="simple-table">
        <thead>
          <tr>
            <th>订单号</th>
            <th>用户</th>
            <th>金额</th>
            <th>状态</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="i in 5" :key="i">
            <td>ORD-20231024-00{{ i }}</td>
            <td>用户_{{ ['张三', '李四', '王五'][i % 3] }}</td>
            <td>¥ {{ (Math.random() * 1000).toFixed(2) }}</td>
            <td><span class="status-badge">已完成</span></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
/* 容器 */
.dashboard-container {
  padding: 20px;
  background-color: #f0f2f5;
  min-height: 100%;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

/* 1.欢迎区域 */
.welcome-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.welcome-text h2 {
  margin: 0 0 8px 0;
  font-size: 24px;
  color: #333;
}

.welcome-text p {
  margin: 0;
  color: #888;
}

.quick-actions {
  display: flex;
  gap: 12px;
}

.action-btn {
  padding: 10px 20px;
  background: #fff;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s;
}

.action-btn:hover {
  border-color: #1890ff;
  color: #1890ff;
}

/* 2.数据卡片网络 */
.stats-grid {
  display: flex;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-bottom: 24px;
}

.stat-card {
  background: #fff;
  padding: 24px;
  border-radius: 4px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
  position: relative;
  overflow: hidden;
  transition: transform 0.3s;
}

.stat-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.stat-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.stat-title {
  color: #888;
  font-size: 14px;
}

.icon-bg {
  font-size: 32px;
  opacity: 0.2;
}

.stat-value {
  font-size: 32px;
  font-weight: bold;
  color: #333;
  margin-bottom: 8px;
}

.stat-trend {
  font-size: 12px;
}

.stat-trend.up {
  color: #52c41a;
}

.stat-trend.down {
  color: #ff4d4f;
}

.blue .icon-bg {
  color: #1890ff;
}

.green .icon-bg {
  color: #52c41a;
}

.orange .icon-bg {
  color: #faad14;
}

.purple .icon-bg {
  color: #722ed1;
}

/* 3.图表区域 */
.charts-section {
  display: flex;
  grid-template-columns: 2fr 1fr;
  gap: 24px;
  margin-bottom: 24px;
}

.chart-card {
  background: #fff;
  padding: 24px;
  border-radius: 4px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}

.card-header h3 {
  margin: 0;
  font-size: 16px;
  color: #333;
}

.time-select {
  padding: 4px 8px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
}

/* css 模拟柱状图 */
.mock-line-chart {
  display: flex;
  align-items: flex-end;
  justify-content: space-around;
  height: 200px;
  padding-top: 20px;
  border-bottom: 1px solid #f0f0f0;
}

.chart-line {
  width: 30px;
  background: linear-gradient(to top, #1890ff, #69c0ff);
  border-radius: 4px 4px 0 0;
  opacity: 0.8;
  transition: height 1s;
}

.chart-labels {
  display: flex;
  justify-content: space-around;
  margin-top: 10px;
  color: #999;
  font-size: 12px;
}

/* css 模拟饼图 */
.mock-pie-chart {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background: conic-gradient(
    var(--color) 0% var(--percent),
    transparent 0%
  );
  margin: 0 auto;
  position: relative;
}

.pie-legend {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-top: 20px;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: #666;
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.dot.blue {
  background: #1890ff;
}

.dot.green {
  background: #52c41a;
}

.dot.orange {
  background: #faad14;
}

/* 4.底部表格 */
.recent-orders {
  background: #fff;
  padding: 24px;
  border-radius: 4px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.05);
}

.view-all {
  color: #1890ff;
  text-decoration: none;
  font-size: 14px;
}

.simple-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 16px;
}

.simple-table th {
  text-align: left;
  padding: 12px;
  color: #888;
  font-weight: normal;
  border-bottom: 1px solid #f0f0f0;
}

.simple-table td {
  padding: 12px;
  color: #333;
  border-bottom: 1px solod #f0f0f0;
  font-size: 14px;
}

.status-badge {
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 12px;
  background: #f6ffed;
  color: #52c41a;
  border: 1px solid #b7eb8f;
}

/* --- 响应式调整 --- */
@media (max-width: 1200px) {
  .stats-grid { grid-template-columns: repeat(2, 1fr); }
  .charts-section { grid-template-columns: 1fr; }
}

</style>
