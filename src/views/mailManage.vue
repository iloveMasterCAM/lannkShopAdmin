<template>
  <div class="main">
    <div class="main-content">
      <div class="container-fluid">
        <h3 class="page-title">商品管理</h3>
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
        <div class="table" style="margin-top:20px;">
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
              prop="Title"
              label="标题"
              width="450">
            </el-table-column>
            <el-table-column
              prop="category_name"
              label="类别"
              width="200">
            </el-table-column>
            <el-table-column
              prop="AddDate"
              label="	发布时间"
              width="200">
            </el-table-column>
            <el-table-column
              prop="Sort"
              label="展示排序"
              width="200">
            </el-table-column>
            <el-table-column
              prop="attr"
              label="	属性"
              width="300">
              <template slot-scope="scope">
                <div class="box">
                  <i class="iconfont icon-pinglun" :class="{active:!scope.row.IsComment}" :title="scope.row.IsComment?cpl:spl" @click="scope.row.IsComment=!scope.row.IsComment"></i>
                  <i class="iconfont icon-top" :title="scope.row.IsTop?czd:szd" :class="{active:!scope.row.IsTop}" @click="scope.row.IsTop=!scope.row.IsTop"></i>
                  <i class="iconfont icon-i-good" :class="{active:!scope.row.IsRecommend}" :title="scope.row.IsRecommend?ctj:stj" @click="scope.row.IsRecommend=!scope.row.IsRecommend"></i>
                  <i class="iconfont icon-hot" :class="{active:!scope.row.IsHot}" :title="scope.row.IsHot?chot:shot" @click="scope.row.IsHot=!scope.row.IsHot"></i>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              width="120">
              <template slot-scope="scope">
                <!--<el-button @click="handleClick(scope.row)" type="primary" size="mini">编辑</el-button>-->
                <i class="el-icon-edit-outline" @click="handleClick(scope.row)" style="color:#f3648c;"></i>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <!--分页-->
        <div class="block" style="float:right;margin-right:40px;">
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

  //instance.defaults.headers.common["token"] = "18xTgOQ1DeMjhFHTgapQqlyt7ntBU+RrTDmDuM/7LUpg7Fu0R028DE4qWcbTRggU7EXU+VASrgEBofcDd/KmvA==";
  export default {
    data(){
      return{
        isSearch:[],
        search:'',
        tableData:[],
        optionsTitle:[],
        optionsClass:[],
        titleName:'',
        classId:'',
        //class
        cpl:"取消评论",
        spl:"设置评论",

        czd:"取消置顶",
        szd:"设置置顶",

        ctj:"取消推荐",
        stj:"设置推荐",

        chot:"取消热门",
        shot:"设置热门",

        currentPage:1,
        total:100,
        showCount:10,
        //复选框 选中数据
        multipleSelection: [],
        //复选框 选中id
        multipleSelectionId:[],
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
      // let config = {headers: {'Content-Type': 'multipart/form-data','token':this.token}};
      // config.headers.common['Authentication-Token']=this.token;
      this.instance.post('http://192.168.1.2:8080/shops/productList.do').then(
        (res)=>{
          console.log(res);
          var data=res.data.productList;
          data.forEach((item)=>{
            item.AddDate=this.changeTime(item.AddDate);
          });
          this.tableData=data;
          this.total=res.data.pageInfo.totalResult;
          //this.optionsTitle=res.data.titleList;
          this.optionsClass=res.data.categoryAllNameList;


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
          data.append("title",this.search);
        this.instance.post('http://192.168.1.2:8080/shops/searchProduct.do',data).then(
          (res)=>{
            console.log(res);
            this.tableData=res.data.searchList;
            //this.total=res.data.pageInfo.totalResult;
            this.total=res.data.searchList.length;
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
      //标题查询
      getTitle(){
          console.log(this.title)
      },
      getClassId(){
          console.log(this.classId)
      },
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
        this.instance.post('http://192.168.1.2:8080/shops/deleteProduct.do',
          data)
          .then((res)=> {
              for(var i=this.multipleSelectionId.length-1;i>=0;i--){
                for (var j=this.tableData.length-1;j>=0;j--){
                  if (this.tableData[j].ID==this.multipleSelectionId[i]){
                    this.tableData.splice(j,1);
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
        this.$router.push({name: 'editProduct',params: {id:row.ID,classList:this.optionsClass,categoryId:row.ClassID}});

      },
      //跳转 添加页面
      goAdd(){
        console.log("000");
        console.log(this.optionsClass);
        this.$router.push({name: "addProduct",params: {catList:this.optionsClass}});
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
