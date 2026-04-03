<script setup>
import { ref } from 'vue';

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
    createTime: '2023-10-24 10:23:11'
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
    createTime: '2023-10-24 09:15:30'
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
    createTime: '2023-10-23 18:45:00'
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
    createTime: '2023-10-22 14:20:10'
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
    createTime: '2023-10-21 11:00:00'
  },
]);

const total = ref(500);



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
          <input type="text" class="search-input" placeholder="请输入订单编号">
        </div>
        <div class="input-group">
          <label for="">下单时间</label>
          <input type="text" class="search-input" placeholder="请输入下单时间">
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
        <button class="btn">搜索</button>
        <button class="btn">重置</button>
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
             <td class="amount">
              <span class="currency">$</span>{{ order.amount }}
             </td>

            <!-- 支付状态 -->
             <td>
              <span class="status-badge" :class="`pay--${order.payStatus}`">
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
        <button>上一页</button>
        <button class="active">1</button>
        <button>2</button>
        <button>3</button>
        <button>下一页</button>
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
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
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



</style>
