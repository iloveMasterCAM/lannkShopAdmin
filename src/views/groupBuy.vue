<template>
  <div class="main">
    <div class="main-content">
      <div class="container-fluid">
        <h3 class="page-title">团购商品管理</h3>
        <!--<el-button plain icon="el-icon-plus" style="margin-bottom: 8px" @click="goAdd">新增</el-button>-->
        <div class="pl"  @click="goAdd">
          <i class="iconfont icon-tianjia1"></i>
          <span>批量添加</span>
        </div>
        <div class="pl"  @click="delSel">
          <i class="iconfont icon-shanchu"></i>
          <span>批量删除</span>
        </div>
        <div class="pl">
          <i class="iconfont icon-bianji"></i>
          <span>批量编辑</span>
        </div>
        <div class="pl">
          <i class="iconfont icon-shenhe"></i>
          <span>批量审核</span>
        </div>
        <div class="pl">
          <i class="iconfont icon-shenhe"></i>
          <span>取消审核</span>
        </div>
        <div class="pl" >
          <i class="iconfont icon-baocun"></i>
          <span>批量保存</span>
        </div>
        <div class="groupIcon">
          <div class="item">
            <i class="iconfont icon-dayinji"></i>
          </div>
          <div class="line">
            |
          </div>
          <div class="item">
            <i class="iconfont icon-daoru"></i>
          </div>
          <div class="line">
            |
          </div>
          <div class="item" style="-webkit-transform: rotate(180deg) translateY(-6px);width:18px;height:18px;">
            <i class="iconfont icon-daoru"></i>
          </div>
          <div class="line">
            |
          </div>
          <div class="item">
            <i class="iconfont icon-export"></i>
          </div>
          <div class="line">
            |
          </div>
          <div class="item">
            <i class="iconfont icon-shuaxin"></i>
          </div>
        </div>
        <div class="search">
          <el-input v-model="search" placeholder="搜索" class="inp" size="mini"></el-input>
          <i class="el-icon-search" @click="searchData"></i>
        </div>
        <el-tabs v-model="activeName" style="margin-left:26px;margin-bottom:10px;">
          <el-tab-pane label="所有团购" name="first">
            <div class="table">
              <el-table
                :data="tableDataAll"
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
                  prop="pro_title"
                  label="团购商品名称"
                  width="410">
                </el-table-column>
                <el-table-column
                  prop="input_user"
                  label="录入"
                  width="120">
                </el-table-column>
                <el-table-column
                  prop="price_original"
                  label="	原价"
                  width="160">
                </el-table-column>
                <el-table-column
                  prop="price_group"
                  label="团购价"
                  width="160">
                </el-table-column>
                <el-table-column
                  label="时间限制"
                  width="280">
                  <template slot-scope="scope" style="text-align:center">
                      <p>{{changeTime(scope.row.start_date)}}<br>至<br>{{changeTime(scope.row.end_date)}}</p>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="property"
                  label="状态"
                  width="140">
                </el-table-column>
                <el-table-column
                  fixed="right"
                  label="操作"
                  width="120">
                  <template slot-scope="scope">
                    <i class="el-icon-edit-outline" @click="handleClick(scope.row)" style="color:#f3648c;margin-right:10px;cursor:pointer;"></i>
                    <i class="el-icon-delete" @click="handleClickDel(scope.row)" style="color:#fcab9a;margin-right:10px;cursor:pointer;"></i>
                  </template>
                </el-table-column>
              </el-table>
              <!--分页1-->
              <div class="block" style="float:right;margin-right:40px;margin-top:20px;">
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
          </el-tab-pane>
          <el-tab-pane label="进行中的团购" name="second">
            <div class="table">
              <el-table
                :data="tableDataActive"
                border
                tooltip-effect="dark"
                @selection-change="handleSelectionChangeActive"
                style="width: 100%">
                <el-table-column
                  type="selection"
                  width="35">
                </el-table-column>
                <el-table-column
                  fixed
                  prop="pro_title"
                  label="团购商品名称"
                  width="380">
                </el-table-column>
                <el-table-column
                  prop="input_user"
                  label="录入"
                  width="120">
                </el-table-column>
                <el-table-column
                  prop="price_original"
                  label="	原价"
                  width="160">
                </el-table-column>
                <el-table-column
                  prop="price_group"
                  label="团购价"
                  width="160">
                </el-table-column>
                <el-table-column
                  label="时间限制"
                  width="320">
                  <template slot-scope="scope">
                    <!--<p>{{changeTime(scope.row.start_date)}}<br>至<br>{{changeTime(scope.row.end_date)}}</p>-->
                    <p>{{scope.row.start_date}}<br>至<br>{{scope.row.end_date}}</p>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="property"
                  label="状态"
                  width="140">
                </el-table-column>
                <el-table-column
                  fixed="right"
                  label="操作"
                  width="120">
                  <template slot-scope="scope">
                    <i class="el-icon-edit-outline" @click="handleClick(scope.row)" style="color:#f3648c;margin-right:10px;cursor:pointer;"></i>
                    <i class="el-icon-delete" @click="handleClickDel(scope.row)" style="color:#fcab9a;margin-right:10px;cursor:pointer;"></i>
                  </template>
                </el-table-column>
              </el-table>
              <div class="block" style="float:right;margin-right:40px;margin-top:20px;">
                <el-pagination
                  background
          
               
                  :current-page="currentPageActive"
                  :page-sizes="[10, 15, 20]"
                  :page-size="100"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="totalActive">
                </el-pagination>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="已结束的团购" name="third">
            <div class="table">
              <el-table
                :data="tableDataEnd"
                border
                tooltip-effect="dark"
                @selection-change="handleSelectionChangeEnd"
                style="width: 100%">
                <el-table-column
                  type="selection"
                  width="35">
                </el-table-column>
                <el-table-column
                  fixed
                  prop="pro_title"
                  label="团购商品名称"
                  width="380">
                </el-table-column>
                <el-table-column
                  prop="input_user"
                  label="录入"
                  width="120">
                </el-table-column>
                <el-table-column
                  prop="price_original"
                  label="	原价"
                  width="160">
                </el-table-column>
                <el-table-column
                  prop="price_group"
                  label="团购价"
                  width="160">
                </el-table-column>
                <el-table-column
                  label="时间限制"
                  width="320">
                  <template slot-scope="scope">
                    <p>{{changeTime(scope.row.start_date)}}<br>至<br>{{changeTime(scope.row.end_date)}}</p>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="property"
                  label="状态"
                  width="140">
                </el-table-column>
                <el-table-column
                  fixed="right"
                  label="操作"
                  width="120">
                  <template slot-scope="scope">
                    <!--<el-button @click="handleClick(scope.row)" type="primary" size="mini">编辑</el-button>-->
                    <i class="el-icon-edit-outline" @click="handleClick(scope.row)" style="color:#f3648c;margin-right:10px;cursor:pointer;"></i>
                    <i class="el-icon-delete" @click="handleClickDel(scope.row)" style="color:#fcab9a;margin-right:10px;cursor:pointer;"></i>
                  </template>
                </el-table-column>
              </el-table>
              <div class="block" style="float:right;margin-right:40px;margin-top:20px;">
                <el-pagination
                  background
              
               
                  :current-page="currentPageEnd"
                  :page-sizes="[10, 15, 20]"
                  :page-size="100"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="totalEnd">
                </el-pagination>
              </div>
            </div>
          </el-tab-pane>
          <!--<el-tab-pane label="库存少于10件的团购" name="fourth">-->

          <!--</el-tab-pane>-->
        </el-tabs>

      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    data(){
      return{
        activeName: 'first',
        isSearch:[],
        search:'',
        tableDataAll:[],
        tableDataActive:[],
        tableDataEnd:[],


        optionsTitle:[],
        optionsClass:[],
        titleName:'',
        classId:'',
        //class
        currentPage:1,
        total:100,
        showCount:10,

        currentPageActive:1,
        totalActive:100,
        showCountActive:10,

        currentPageEnd:1,
        totalEnd:100,
        showCountEnd:10,

        //复选框 选中数据
        multipleSelection: [],
        multipleSelectionActive: [],
        multipleSelectionEnd: [],
        //复选框 选中id
        multipleSelectionId:[],
        multipleSelectionAid:[],
        multipleSelectionEid:[],
        //token:"18xTgOQ1DeMjhFHTgapQqlyt7ntBU+RrTDmDuM/7LUpg7Fu0R028DE4qWcbTRggU7EXU+VASrgEBofcDd/KmvA=="
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
      this.instance.post('http://192.168.1.2:8080/shops/group/getProductGroupList.do').then(
        (res)=>{
          console.log(res.data);
          this.tableDataAll=res.data.productGroupList;
          this.tableDataActive=res.data.goingGroupList;
          this.tableDataEnd=res.data.finishedGroupList;
          this.total=res.data.pageInfo.totalResult;
          this.totalActive=this.tableDataActive.length;
          this.totalEnd=this.tableDataEnd.length;
        }
      ).catch((err)=>{
        console.log(err);
      });
    },
    methods: {
      //搜索关键词
      searchData(){
        console.log(this.search);
        let data=new FormData();
        data.append("proTitle",this.search);
        this.instance.post('http://192.168.1.2:8080/shops/group/searchGroupProduct.do',data).then(
          (res)=>{
            console.log(res);
            // this.tableDataAll=res.data.productGroupList;

          }
        ).catch((err)=>{
          console.log(err);
        });

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
      getClassId(){
        console.log(this.classId)
      },
      //选中数组
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      handleSelectionChangeActive(val) {
        this.multipleSelectionActive = val;
      },
      handleSelectionChangeEnd(val) {
        this.multipleSelectionEnd = val;
      },
      //批量删除
      delSel(){
        //this.multipleSelectionId
        var data = new FormData();
        data.append("ids",this.multipleSelectionId);
        this.instance.post('http://192.168.1.2:8080/shops/group/deleteProductGroupByIds.do',
          data)
          .then((res)=> {
            console.log(res);
            this.$router.go(0);

          }).catch((err)=>{
          console.log(err);
        });

      },
      //跳转 修改页面
      handleClick(row) {
        console.log(row);
        this.$router.push({name: 'editGroup',params: {id:row.id}});

      },
      //单个删除
      handleClickDel(row){
        var data = new FormData();
        data.append("id",row.id);
        this.instance.post('http://192.168.1.2:8080/shops/group/deleteProductGroupById.do',
          data)
          .then((res)=> {
            console.log(res);
            this.$router.go(0);
          }).catch((err)=>{
          console.log(err);
        });
      },
      //跳转 添加页面
      goAdd(){
        // console.log(this.optionsClass);
        this.$router.push({name: "addGroupGoods"});
      },
      //分页
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.showCount=val;
        var data = new FormData();
        data.append("currentPage",this.currentPage);
        data.append("showCount",this.showCount);
        this.instance.post('http://192.168.1.2:8080/shops/productList.do',
          data)
          .then((res)=> {
            this.tableData=res.data.productList;
            this.total=res.data.pageInfo.totalResult;
            console.log(res);
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
        this.instance.post('http://192.168.1.2:8080/shops/productList.do',
          data)
          .then((res)=> {
            this.tableData=res.data.productList;
            this.total=res.data.pageInfo.totalResult;
            console.log(res.data);
          }).catch((err)=>{
          console.log(err);
        });
      }


    },
    watch: {
      multipleSelection: function () {
        let arr = [];
        for (let i in this.multipleSelection) {
          arr.push(this.multipleSelection[i].id);
          //console.log(this.multipleSelection[i].ID);
        }
        this.multipleSelectionId=arr;
        console.log(JSON.stringify(this.multipleSelectionId));
      },
      multipleSelectionActive: function () {
        let arr = [];
        for (let i in this.multipleSelectionActive) {
          arr.push(this.multipleSelectionActive[i].id);
          //console.log(this.multipleSelection[i].ID);
        }
        this.multipleSelectionId=arr;
        console.log(JSON.stringify(this.multipleSelectionId));
      },
      multipleSelectionEnd: function () {
        let arr = [];
        for (let i in this.multipleSelectionEnd) {
          arr.push(this.multipleSelectionEnd[i].id);
          //console.log(this.multipleSelection[i].ID);
        }
        this.multipleSelectionId=arr;
        console.log(JSON.stringify(this.multipleSelectionId));
      },

    },
  }
</script>


<style scoped>
  .page-title{
    font-size:16px;
    color:#647787;
    margin-bottom:40px;
    margin-left:28px;
  }
  .container-fluid{
    background-color:#fff;
    padding:40px;
    margin-left: 12px;
    position:relative;
  }
  .box i{
    -border:1px solid #ddd;
    padding:2px;
    cursor:pointer;
    font-size:14px;
  }
  .box i.active{
    color:#ccc;
  }
  .pl{
    display: inline-block;
    cursor: pointer;
    margin-bottom:20px;
    margin-right:18px;
    margin-left:28px;
  }
  .pl i{
    font-size:16px;
    margin-right:4px;
  }
  .pl span{
    font-size:14px;
    color:#647787;
  }
  .search{
    float:right;
    position:relative;
    width:158px;
    height:28px;
    margin-right:50px;
  }
  .search .inp{
    width:100%;
    height:100%;
  }
  .search i{
    position:absolute;
    right:8px;
    top:6px;
    cursor: pointer;
    z-index: 999;
  }

  .groupIcon{
    display:flex;
    position:absolute;
    top:40px;
    right:50px;
  }
  .groupIcon div{
    color:#a8afbb;
    margin:0 6px;
  }
  .groupIcon .line{
    -webkit-transform: scale(0.4,0.8);
    text-align: center;
  }
  .groupIcon .item i{
      font-size:18px;
    color:#a8afbb;
    cursor:pointer;
  }

</style>
