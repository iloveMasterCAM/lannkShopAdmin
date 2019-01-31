<template>
  <div class="main">
    <div class="main-content">
      <div class="container-fluid">
        <h3 class="page-title">满就送</h3>
        <el-form ref="form" :model="form" label-width="80px"  style="margin-left:50px;">
          <el-form-item >
            <p style="font-size:14px;color:#647787;padding-bottom:16px;">活动名称</p>
            <el-input v-model="form.title" style="width:580px" placeholder="请输入活动名称"></el-input>
          </el-form-item>
          <el-form-item>
            <p style="font-size:14px;color:#647787;padding-bottom:16px;">优惠设置</p>
            <el-table
              :header-cell-style="{background:'#f3f5f7',fontsize:'14px',color:'#647787',fontWeight:'normal'}"
              ref="singleTable"
              border
              :data="tableData"
              style="width: 581px">
              <el-table-column
                align="center"
                type="index"
                label="层级"
                width="60">
              </el-table-column>
              <el-table-column
                property="topPrice"
                align="center"
                label="优惠条件"
                width="200">
                <template slot-scope="scope">
                  <span>满</span>
                  <el-input-number v-model="scope.row.topPrice" controls-position="right"  :min="0"  size="mini" :precision="2"></el-input-number>
                  <span>元</span>
                </template>
              </el-table-column>
              <el-table-column
                align="center"
                property="subPrice"
                label="	优惠金额"
                width="200">
                <template slot-scope="scope">
                  <span>减</span>
                  <el-input-number v-model="scope.row.subPrice" controls-position="right"  :min="0"  size="mini" :precision="2"></el-input-number>
                  <span>元</span>
                </template>
              </el-table-column>
              <el-table-column
                width="120"
                align="center"
                label="操作">
                <template slot-scope="scope">
                  <!--<i class="el-icon-delete"  @click="handleDelete(scope.$index, scope.row)" style="color:#fcab9a;margin-left:8px;cursor:pointer;"></i>-->
                  <span @click="handleDelete(scope.$index, scope.row)" style="color:#fb1838;cursor: pointer">删除</span>
                </template>
              </el-table-column>
            </el-table>
          </el-form-item>
          <el-form-item   v-show="tableData.length<4">
            <span class="el-icon-plus" @click="addDiscount" style="cursor:pointer;color:#007AFF;">新增一级优惠</span>
          </el-form-item>
          <el-form-item style="margin-top:120px;margin-left:120px;">
            <el-button type="primary" @click="onSubmit" style="width:100px;height:36px;text-align: center;">确定保存</el-button>
            <el-button type="danger" @click="close" style="width:100px;height:36px;text-align: center;">关闭活动</el-button>
            <el-button @click="cancel" style="width:100px;height:36px;text-align: center;color:#a8afbb;">返回</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
  import axios from 'axios'
  export default {
    data(){
      return{
        storeId:'',

        ids:[],
        form:{
          title:'',
        },
        tableData: [{
          topPrice:0,
          subPrice:0

        }, {
          topPrice:0,
          subPrice:0

        }],

      }
    },
    created(){
      this.instance = axios.create({
        headers:{
          "token":"18xTgOQ1DeMjhFHTgapQqmFoM3vbj3J3C53CthEtA6YnBnp+TPy3/RwdsvCidsZLmjQK5gb48EQquYapxDSLyQ=="
        }
      });
    },
    mounted() {
      this.instance.post("http://192.168.1.2:8080/shops/discount/getProductDiscount.do").then((res)=>{
        console.log(res);
        if(res.data){
          this.form.title=res.data.productDiscountConfig.title;
          this.storeId=res.data.productDiscountConfig.storeId;
          this.tableData=res.data.productDiscountList;
        }
      }).catch((err)=>{
        console.log(err)
      })
    },
    methods:{
      handleDelete(index,row){
        this.tableData.splice(index,1);
        if(this.storeId){
          this.ids.push(row.id);
        }
        console.log(this.ids)

      },
      addDiscount(){
        if(this.tableData.length<4){
          let o={};
          o.id=0;
          o.topPrice=0;
          o.subPrice=0;
          this.tableData.push(o);
        }
      },
      onSubmit(){
        if(this.storeId){
          if(!this.form.title){
            this.$message('请输入活动名称');
            return;
          }
          this.tableData.forEach((item,index)=>{
            item.level=index+1;
          });
          let data=new FormData();
          data.append("title",this.form.title);
          data.append("discountList",JSON.stringify(this.tableData));
          data.append("delIds",this.ids);
          console.log(data.get("delIds"));
          this.instance.post("http://192.168.1.2:8080/shops/discount/updateProductDiscount.do",data).then((res)=>{
            console.log(res);
            if(res.data.status){
              this.$message({
                message: '保存成功',
                type: 'success'
              });
              this.$router.push({name:"activity"})
            }
          }).catch((err)=>{
            console.log(err)
          });
        }else {
          if(!this.form.title){
            this.$message('请输入活动名称');
            return;
          }
          this.tableData.forEach((item,index)=>{
            item.level=index+1;
          });
          console.log(this.tableData);
          let data=new FormData();
          data.append("title",this.form.title);
          data.append("discountList",JSON.stringify(this.tableData));
          this.instance.post("http://192.168.1.2:8080/shops/discount/addProductDiscount.do",data).then((res)=>{
            console.log(res);
            if(res.data.status){
              this.$message({
                message: '保存成功',
                type: 'success'
              });
              this.$router.push({name:"activity"})
            }
          }).catch((err)=>{
            console.log(err)
          });
        }

      },
      cancel(){
        this.$router.push({name:"activity"})
      },
      close(){
        if(this.storeId===""){
          return;
        }
        this.instance.post("http://192.168.1.2:8080/shops/discount/deleteDiscountByStoreId.do").then((res)=>{
          this.$message({
            message: '关闭成功',
            type: 'success'
          });
          this.$router.push({name:"activity"})
        }).catch((err)=>{
          console.log(err)
        })
      },
    }
  }
</script>

<style scoped>
  li{
    list-style: none;
  }
  .page-title{
    font-size:16px;
    color:#1e1c1c;
    margin-bottom:40px;
    margin-left:28px;

  }
  .container-fluid{
    background-color:#fff;
    padding:40px;
    margin-left: 12px;
    position:relative;
  }

</style>
