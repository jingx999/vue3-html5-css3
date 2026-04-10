<script setup>
import { ref } from 'vue'

const orderList = ref([
  {
    id: 'ORD20231024001',
    isNew: true,
    productName: '人体工学办公椅 - 黑色',
    spec: '标准版 / 不带脚踏',
    amount: '899.00',
    payStatus: 'paid',
    payStatusText: '已支付',
    logisticsStatus: 'shipped',
    logisticsText: '已发货',
    createTime: '2023-10-24 10:23:11',
  },
  {
    id: 'ORD20231024002',
    isNew: false,
    productName: '机械键盘 Keychron K2',
    spec: '红轴 / 白光 / Mac布局',
    amount: '568.00',
    payStatus: 'unpaid',
    payStatusText: '待付款',
    logisticsStatus: 'pending',
    logisticsText: '待发货',
    createTime: '2023-10-24 09:15:30',
  },
  {
    id: 'ORD20231023005',
    isNew: false,
    productName: 'Type-C 扩展坞',
    spec: '7合1 / 深空灰',
    amount: '199.00',
    payStatus: 'paid',
    payStatusText: '已支付',
    logisticsStatus: 'pending',
    logisticsText: '待发货',
    createTime: '2023-10-23 18:45:00',
  },
  {
    id: 'ORD20231022012',
    isNew: false,
    productName: '无线鼠标 Master 3S',
    spec: '白色 / 静音版',
    amount: '699.00',
    payStatus: 'paid',
    payStatusText: '已支付',
    logisticsStatus: 'completed',
    logisticsText: '已完成',
    createTime: '2023-10-22 14:20:10',
  },
  {
    id: 'ORD20231021008',
    isNew: false,
    productName: '显示器挂灯 ScreenBar',
    spec: 'Pro版 / 挂屏',
    amount: '999.00',
    payStatus: 'refunded',
    payStatusText: '已退款',
    logisticsStatus: 'completed',
    logisticsText: '已完成',
    createTime: '2023-10-21 11:00:00',
  },
])

const total = ref(500)
</script>
<template>
  <div class="order-manage-container">
    <!-- 顶部标题区域 -->
    <div class="page-header">
      <h2>订单列表</h2>
      <p class="breadcrumb">首页/订单中心/订单列表</p>
    </div>

    <!-- 订单筛选区域 -->
    <div class="filter-card">
      <div class="filter-row">
        <div class="input-group">
          <label for="">订单编号</label>
          <input type="text" class="search-input" placeholder="请输入订单编号" />
        </div>
        <div class="input-group">
          <label for="">下单时间</label>
          <input type="text" class="search-input" placeholder="请输入下单时间" />
        </div>
        <div class="input-group">
          <label for="">订单状态</label>
          <select name="" id="" class="search-select">
            <option value="">全部状态</option>
            <option value="1">代付款</option>
            <option value="2">待发货</option>
            <option value="3">已发货</option>
            <option value="4">已完成</option>
          </select>
        </div>
        <button class="btn btn-primary">搜索</button>
        <button class="btn btn-primary">重置</button>
      </div>
    </div>
    <!-- 数据展示区域 -->
    <div class="table-wrapper">
      <table class="data-table">
        <thead>
          <tr>
            <th>订单编号</th>
            <th>商品信息</th>
            <th>订单金额</th>
            <th>支付状态</th>
            <th>物流状态</th>
            <th>下单时间</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="order in orderList" :key="order.id">
            <!-- 订单编号 -->
            <td class="order-id">
              {{ order.id }}
              <div v-if="order.isNew" class="new-badge">新</div>
            </td>

            <!-- 商品信息 -->
            <td class="">
              <div class="product-info">
                <div class="product-img"></div>
                <div class="product-detail">
                  <div class="product-name">{{ order.productName }}</div>
                  <div class="product-spec">规格: {{ order.spec }}</div>
                </div>
              </div>
            </td>

            <!-- 金额 -->
            <td class="amount"><span class="currency">$</span>{{ order.amount }}</td>

            <!-- 支付状态 -->
            <td>
              <span class="status-badge" :class="`pay-${order.payStatus}`">
                {{ order.payStatusText }}
              </span>
            </td>

            <!-- 物流状态 -->
            <td>
              <div class="logistics-step">
                <i class="iconfont icon-truck"></i>{{ order.logisticsText }}
              </div>
            </td>
            <!-- 时间 -->
            <td class="time-cell">
              {{ order.createTime }}
            </td>
            <!-- 操作 -->
            <td>
              <div class="action-group">
                <a href="" class="action-link">详情</a>
                <a v-if="order.payStatus === 'unpaid'" href="" class="action-link">催付</a>
                <a v-if="order.logisticsStatus === 'pending'" href="" class="action-link">发货</a>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- 分页区域 -->
    <div class="pagination">
      <div class="page-buttons">
        <button class="">上一页</button>
        <button class="active">1</button>
        <button class="">2</button>
        <button class="">3</button>
        <button class="">下一页</button>
      </div>
      <span class="page-total">共计{{ total }} 条订单数据</span>
    </div>
  </div>
</template>

<style scoped>
/* 继承用户管理页面的基础样式 */
.order-manage-container {
  padding: 20px;
  background-color: #f0f2f5;
  min-height: 100%;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

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
}

.search-input,
.search-select {
  padding: 8px 12px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  width: 200px;
  outline: none;
}

.search-input:focus {
  border-color: #1890ff;
}

.btn {
  padding: 8px 16px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  font-size: 14px;
}

.btn-primary {
  background: #1890ff;
  color: #fff;
}

.btn-default {
  background: #fff;
  border: 1px solid #d9d9d9;
  color: #555;
}

.table-wrapper {
  background: #fff;
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
}

.data-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
}

.data-table th {
  background: #fafafa;
  padding: 12px 20px;
  font-weight: 600;
  color: #333;
  border-bottom: 1px solid #f0f0f0;
  font-size: 14px;
}

.data-table td {
  padding: 16px 20px;
  border-bottom: 1px solid #f0f0f0;
  color: #555;
  font-size: 14px;
}

.data-table tr:hover {
  background: #fafafa;
}

/* 订单页特有样式 */
.order-id {
  font-family: 'Courier New', monospace;
  color: #1890ff;
  position: relative;
  padding-left: 5px;
}

.new-badge {
  position: absolute;
  top: -8px;
  right: -15px;
  background: #ff4d4f;
  color: #fff;
  font-size: 14px;
  padding: 1px 4px;
  border-radius: 2px;
  transform: scale(0.8);
}

/* 商品信息 */
.product-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.product-img {
  width: 40px;
  height: 40px;
  background: #f5f5f5;
  border-radius: 4px;
  border: 1px solid #eee;
}

.product-detail {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.product-name {
  color: #333;
  font-weight: 500;
}

.product-spec {
  color: #999;
  font-size: 12px;
}

/* 金额强调 */
.amount {
  color: #ff4d4f !important;
  font-weight: bold;
  font-size: 12px;
}

.currency {
  font-size: 12px;
  font-weight: normal;
}

/* 状态标签颜色变体 */
.status-badge {
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 12px;
  border: 1px solid transparent;
}

.pay-paid {
  background: #e6f7ff;
  color: #1890ff;
  border-color: #91d5ff;
}

.pay-unpaid {
  background: #fff7e6;
  color: #fa8c16;
  border-color: #ffd591;
}

.pay-refunded {
  background: #fff2f0;
  color: #ff4d4f;
  border-color: #ffccc7;
}

/* 物流状态 */
.logistics-step {
  display: flex;
  align-items: center;
  gap: 6px;
  color: #555;
}

.icon-truck::before {
  content: '🚚';
  font-size: 12px;
}

/* 操作链接 */
.action-group {
  display: flex;
  gap: 10px;
}

.action-link {
  color: #1890ff;
  text-decoration: none;
}

.action-link:hover {
  color: #40a9ff;
}

.pagination {
  display: flex;
  gap: 8px;
}

.page-buttons button {
  padding: 6px 12px;
  border: 1px solid #d9d9d9;
  background: #fff;
  border-radius: 4px;
  cursor: pointer;
}

.page-buttons button.active {
  background: #1890ff;
  color: #fff;
  border-color: #1890ff;
}
</style>
