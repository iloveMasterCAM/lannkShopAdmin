<template>
  <div class="main">
    <div id="order">
      <div class="title">订单列表</div>
      <div class="el-row saerch">
        <div class="el-col-5">
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
        <div class="el-col-5">
          <el-input placeholder="输入关键字"></el-input>
        </div>
        <div class="el-col-7">时间：
          <el-date-picker v-model="value1" type="datetime" placeholder="选择日期时间"></el-date-picker>
        </div>
        <div class="el-col-2">
          <el-button type="primary">搜索</el-button>
        </div>
      </div>
      <div class="navmenu">
        <span class="active">全部</span>
        <span>全部</span>
        <span>全部</span>
        <span>全部</span>
        <span>全部</span>
      </div>
      <div class="table">
        <table width="100%" border="0" cellspacing="0" cellpadding="0">
          <tr class="th">
            <th>ID</th>
            <th>订单编号</th>
            <th>账户名称</th>
            <th>发货时间</th>
            <th>支付金额</th>
            <th>状态</th>
            <th>操作</th>
          </tr>
          <tr class="td" v-for="(item,index) in orderLits" :key="index">
            <td class="id">1</td>
            <td class="order">{{item.orderNo}}</td>
            <td>{{item.userName}}</td>
            <td>{{ changeTime(item.expressTime) }}</td>
            <td>{{item.payMentFee}}</td>
            <td>{{item.status}}</td>
            <td>
              <span @click="edit(item.id)">编辑</span>
              <span>删除</span>
            </td>
          </tr>
    
          
        </table>
      </div>
      <div>
        <el-pagination @next-click="next" layout="prev, pager, next" :total="1000"></el-pagination>
      </div>
    </div>
  </div>
</template>
<style>
#order {
  margin: 20px;
  background: #fff;
  padding: 20px;
}
#order .title {
  font-size: 16px;
  color: #1e1c1c;
}
#order .saerch {
  padding-top: 10px;
}
#order .saerch > div {
  padding-right: 10px;
}
#order .navmenu {
  line-height: 40px;
  margin-top: 20px;
  border-bottom: 1px solid #eee;
}
#order .navmenu span {
  display: inline-block;
  padding: 0 20px;
  cursor: pointer;
  border-bottom: 2px solid transparent;
}
#order .navmenu span.active {
  border-color: #328ffe;
  color: #328ffe;
}
#order .table table {
  border-collapse: collapse;
}
#order .table {
  margin-top: 20px;
  padding-bottom: 5px;
}
#order .table .th {
  background: #f3f5f7;
  line-height: 45px;
}
#order .table th {
  color: #647787;
}
#order .table th,
#order .table td {
  text-align: center;
  line-height: 45px;
}
#order .table .id {
  color: #fbae84;
}
#order .table .order {
  color: #1de6b9;
}
#order .td {
  border-bottom: 1px solid #eee;
}
#order {
}
#order {
}
#order {
}
#order {
}
#order {
}
#order {
}
#order {
}
#order {
}
#order {
}
#order {
}
#order {
}
#order {
}
</style>
    
<script>
export default {
  data() {
    return {
      activeName: "",
      orderLits:[],
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ],
      value: "",
      value1: ""
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    next() {
      console.log("next");
    },
    edit(id) {
      this.$router.push({ path: "/orderDetail", query: { orderId: id } });
    },
    changeTime(unixtimestamp){
        var unixtimestamp = new Date(unixtimestamp);
        var year = 1900 + unixtimestamp.getYear();
        var month = "0" + (unixtimestamp.getMonth() + 1);
        var date = "0" + unixtimestamp.getDate();
        var hour = "0" + unixtimestamp.getHours();
        var minute = "0" + unixtimestamp.getMinutes();
        var second = "0" + unixtimestamp.getSeconds();
        return year + "-" + month.substring(month.length-2, month.length)  + "-" + date.substring(date.length-2, date.length)
          + " " + hour.substring(hour.length-2, hour.length) + ":"
          + minute.substring(minute.length-2, minute.length) + ":"
          + second.substring(second.length-2, second.length);
      },

    //
  },
  mounted() {
    let that = this;
    this.axios.post("orders/getListByPage", {}, function(r) {
      console.log(r);
      if(r.s){
             that.orderLits = r.d.orders
      }
  
    });
  }
};
</script>
