<template>
  <div class="main">
    <div class="main-content">
      <div class="container-fluid clearfix">
        <h3 class="page-title">规格管理</h3>
        <!--<el-button plain icon="el-icon-plus" style="margin-bottom: 8px" @click="goAdd">新增</el-button>-->
        <!--<el-button plain icon="el-icon-delete" style="margin-bottom: 8px" @click="delSel">删除</el-button>-->
        <div class="pl"  @click="goAdd">
          <i class="iconfont icon-tianjia1"></i>
          <span>批量添加</span>
        </div>
        <div class="pl"  @click="delSel">
          <i class="iconfont icon-shanchu"></i>
          <span>批量删除</span>
        </div>
            <div class="table">
              <el-table
                :data="tableData"
                border
                tooltip-effect="dark"
                @selection-change="handleSelectionChange"
                style="width: 100%">
                <el-table-column
                  type="selection"
                  width="35">
                </el-table-column>
                <el-table-column
                  fixed
                  prop="title"
                  label="名称"
                  width="300">
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="	规格值"
                  width="900">
                  <template scope="scope">
                    <span  v-show="!item.src" :title="item.text" v-html="item.text" v-for="(item,index) in scope.row.name" :key="index" class="span"></span>
                    <img   v-show="img.src"   :src="img.src" :title="img.text" v-for="(img,index) in scope.row.name" :key="index" class="img">
                  </template>
                </el-table-column>
                <el-table-column
                  prop="sort"
                  label="排序"
                  width="200">
                </el-table-column>
                <el-table-column
                  fixed="right"
                  label="操作"
                  width="120">
                  <template slot-scope="scope">
                    <el-button @click="handleClick(scope.row)" type="primary" size="mini">编辑</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          <!--分页-->
        <div class="block" style="float:right;margin-right:40px;margin-top:40px;">
          <el-pagination
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[10, 15, 20]"
            :page-size="100"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
          </el-pagination>
        </div>

      </div>
    </div>
  </div>
</template>

<script>

  import axios from 'axios'
  // var instance = axios.create({
  // });
  // instance.defaults.headers.common["token"] = "18xTgOQ1DeMjhFHTgapQqlyt7ntBU+RrTDmDuM/7LUpg7Fu0R028DE4qWcbTRggU7EXU+VASrgEBofcDd/KmvA==";


  export default {
      data(){
        return{
          // tableData: [{
          //   title: '衣服规格',
          //   name: [{text:'S'},{text:"M"},{text:"L"}],
          //   sort: 10
          // }, {
          //   title: '颜色',
          //   name: [{text:"女神粉",src:"http://img.hb.aicdn.com/80500376fb2aeb15f7aa506cfef58ff8c32772c815b972-tYqZCj_fw658"},{text:"莲花白",src:"http://img.hb.aicdn.com/ddacc34690a462613d414a694f242cbf8d339cdcab77-ZIqxx0_fw658"},{text:"基佬紫",src:"http://img.hb.aicdn.com/2c75864a8488647d569d5cfe1391c22161f31ad2411f0-xAh884_fw658"}],
          //   sort: 20
          // }, {
          //   title: '版本',
          //   name: [{text:'移动4G'},{text:"联通4G"},{text:"电信4G"},{text:"全网通"}],
          //   sort: 200
          // }],
          tableData:[],
          currentPage:1,
          total:100,
          showCount:10,
          //复选框 选中数据
          multipleSelection: [],
          //复选框 选中id
          multipleSelectionId:[],
          token:"18xTgOQ1DeMjhFHTgapQqlyt7ntBU+RrTDmDuM/7LUpg7Fu0R028DE4qWcbTRggU7EXU+VASrgEBofcDd/KmvA=="
        }
      },
    created(){
      this.instance = axios.create({
        headers:{
          "token":"18xTgOQ1DeMjhFHTgapQqmFoM3vbj3J3C53CthEtA6YnBnp+TPy3/RwdsvCidsZLmjQK5gb48EQquYapxDSLyQ==",
          "Content-Type": "multipart/form-data"
        }
      });
    },
      mounted() {

        //let config = {headers: {'Content-Type': 'multipart/form-data','token':this.token}};
       // config.headers.common['Authentication-Token']=this.token;
        this.instance.post('http://192.168.1.2:8080/shops/goodsSpecList.do').then(
          (res)=>{
            console.log(res);
            this.tableData=res.data.goodsSpecList;
            this.total=res.data.pageInfo.totalResult;
            console.log(res.data.goodsSpecList);
          }
        ).catch((err)=>{
          console.log('err');
          console.log(err);
        });
      },
      methods: {
        //选中数组
        handleSelectionChange(val) {
          this.multipleSelection = val;
        },
        //批量删除
        delSel(){
            //this.multipleSelectionId
          var data = new FormData();

          data.append("ids",this.multipleSelectionId);
          console.log(data.get('ids'));
          axios.post('http://192.168.1.2:8080/shops/deleteGoodsSpecByIds.do',


            data)
            .then((res)=> {
              if(res.data.S===1){
                for(var i=this.multipleSelectionId.length-1;i>=0;i--){
                    for (var j=this.tableData.length-1;j>=0;j--){
                          if (this.tableData[j].ID==this.multipleSelectionId[i]){
                              this.tableData.splice(j,1);
                          }
                    }
                }
                this.$message({
                  message: '删除成功',
                  type: 'success'
                });
                // setTimeout(()=>{
                //   this.$router.go(0)
                // })
              }
              console.log(res)
            }).catch((err)=>{
            console.log(err);
          });
        },
        //跳转 修改页面
        handleClick(row) {
          console.log(row);
          this.$router.push({name: 'modifySpec',params: {data:row}});

        },
        //跳转 添加页面
        goAdd(){
          this.$router.push({name: 'addSpec'});
        },
        //分页
        handleSizeChange(val) {
          console.log(`每页 ${val} 条`);
          this.showCount=val;
          var data = new FormData();
          data.append("currentPage",this.currentPage);
          data.append("showCount",this.showCount);
          axios.post('http://192.168.1.2:8080/shops/goodsSpecList.do',
            data)
            .then((res)=> {
              this.tableData=res.data.goodsSpecList;
              this.total=res.data.pageInfo.totalResult;
              console.log(res.data.pageInfo.totalResult);
            }).catch((err)=>{
            console.log(err);
          });
        },
        //点击分页
        handleCurrentChange(val) {
          console.log(`当前页: ${val}`);

          var data = new FormData();
          //data.append("currentPage",val);
          data.append("currentPage",val);
          data.append("showCount",this.showCount);
          axios.post('http://192.168.1.2:8080/shops/goodsSpecList.do',
            data)
            .then((res)=> {
              this.tableData=res.data.goodsSpecList;
              this.total=res.data.pageInfo.totalResult;
              console.log(res.data.pageInfo.totalResult);
            }).catch((err)=>{
            console.log(err);
          });
        }


    },
    watch: {
      multipleSelection: function () {
        let arr = [];
        for (let i in this.multipleSelection) {
          arr.push(this.multipleSelection[i].ID);
          //console.log(this.multipleSelection[i].ID);
        }
        this.multipleSelectionId=arr;
        console.log(JSON.stringify(this.multipleSelectionId));
      }
    },
  }
</script>


<style scoped>
  .page-title{
    font-size:18px;
  }
  .span{
    border:1px solid #eee;
    display:inline-block;
    text-align:center;
    padding:0 10px;
    margin-right:10px;
  }
  .img{
    display:inline-block;
    width:34px;
    height:34px;
    border:1px solid #ddd;
    margin-right:10px;
  }
  .container-fluid{
      background-color:#fff;
      padding:20px;
      margin-left: 12px;
  }
  .pl{
    display: inline-block;
    cursor: pointer;
    margin-bottom:26px;
    margin-right:18px;
  }
  .pl i{
    font-size:16px;
    margin-right:4px;
  }
  .pl span{
    font-size:14px;
  }
</style>
