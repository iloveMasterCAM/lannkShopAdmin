<template>
  <div class="main">
    <div id="order_">
      <div class="title">订单详情</div>
      <div class="table">
        <div class="th">商品列表</div>
        <table width="100%" border="0" cellspacing="0" cellpadding="0">
          <tr class="tr">
            <th>商品信息</th>
            <th>售价</th>
            <th>销售价</th>
            <th>积分</th>
            <th>数量</th>
            <th>金额</th>
            <th>合计</th>
          </tr>
          <tr class="tr">
            <td width="25%">
              <img
                class="shopimg"
                src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=4118792058,1226806534&fm=27&gp=0.jpg"
                alt
              >
              <div class="txt">
                <p>2121505451</p>
                <p>2121505451</p>
              </div>
            </td>
            <td>1</td>
            <td>1</td>
            <td>1</td>
            <td>1</td>
            <td>1</td>
            <td>1</td>
          </tr>
        </table>
      </div>
      <div class="table">
        <div class="th">收货信息</div>
        <table width="100%" border="0" cellspacing="0" cellpadding="0">
          <tr class="tr">
            <th>收件人</th>
            <th>收货地址</th>
            <th>邮编号</th>
            <th>手机</th>
            <th>邮箱</th>
            <th>编辑</th>
          </tr>
          <tr class="tr">
            <td>1</td>
            <td>{{detail.area || '*'}}</td>
            <td>{{detail.postCode || '*'}}</td>
            <td>{{detail.mobile || '*'}}</td>
            <td>{{detail.email || '*'}}</td>

            <td>1</td>
          </tr>
        </table>
      </div>
      <div class="table">
        <div class="th">支付信息</div>
        <table width="100%" border="0" cellspacing="0" cellpadding="0">
          <tr class="tr">
            <th>支付方式</th>
            <th>支付金额</th>
            <th>支付时间</th>
            <th>支付单号</th>
            <th>订单编号</th>
          </tr>
          <tr class="tr">
            <td>1</td>
            <td>{{detail.parmentFee || '*'}}</td>
            <td>{{detail.parmentTime || '*'}}</td>
            <td>1</td>
            <td>{{detail.orderNo}}</td>
          </tr>
        </table>
      </div>
      <div class="table">
        <div class="th">配送信息</div>
        <table width="100%" border="0" cellspacing="0" cellpadding="0">
          <tr class="tr">
            <th>快递公司</th>
            <th>发送时间</th>
            <th>快递Id</th>
            <th>快递编号</th>
            <th>快递费用</th>

            <th>编辑</th>
          </tr>
          <tr class="tr">
            <td>1</td>
            <td>{{detail.expressTime || '*'}}</td>
            <td>{{detail.expressId || '*'}}</td>
            <td>{{detail.expressNo || '*'}}</td>
            <td>{{detail.expressFee || '*'}}</td>

            <td>1</td>
          </tr>
        </table>
      </div>
      <div class="table">
        <div class="th">订单统计</div>
        <table width="100%" border="0" cellspacing="0" cellpadding="0">
          <tr class="tr">
            <th>商品总金额</th>
            <th>应付金额</th>
            <th>支付手续费</th>
            <th>实付金额</th>
            <th>订单金额</th>
            <th>订单总金额</th>
          </tr>
          <tr class="tr">
            <td>1</td>
            <td>1</td>
            <td>1</td>
            <td>1</td>
            <td>1</td>
            <td>1</td>
          </tr>
        </table>
      </div>
       <div class="table">
        <div class="th">用户备注</div>
        <table width="100%" border="0" cellspacing="0" cellpadding="0">
         
          <tr class="tr">
            <td>{{detail.remark || '*'}}</td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>
<style>
#order_ {
  margin: 20px;
  background: #fff;
  padding: 20px;
}
#order_ .title {
  font-size: 16px;
  color: #1e1c1c;
}
#order_ .th {
  background: #f3f5f7;
  line-height: 45px;
  text-align: center;
}
#order_ .table {
  border-left: 1px solid #eee;
  border-right: 1px solid #eee;
}
#order_ .table table {
  border-collapse: collapse;
  text-align: left;
}
#order_ .table table td,
#order_ .table table th {
  height: 50px;
}
#order_ .table {
  margin-top: 20px;
}
#order_ .table th,
#order_ .table td {
  text-align: left;
  color: #647787;
  padding: 0 15px;
  position: relative;
}
#order_ .tr {
  border-bottom: 1px solid #eee;
}

#order_ .shopimg {
  width: 30px;
  position: absolute;
  top: 10px;
  left: 15px;
}
#order_ .txt p {
  padding-left: 40px;
}
</style>
<script>
export default {
  data() {
    return {
      detail: ""
    };
  },
  mounted() {
    //orders/getOrderByid
    let that = this;
    this.axios.post(
      "orders/getOrderByid",
      { id: this.$route.query.orderId },
      function(r) {
        console.log(r);
        if (r.s) {
          that.detail = r.d.order;
        }
      }
    );
    console.log(this.$route.query.orderId);
  }
};
</script>
