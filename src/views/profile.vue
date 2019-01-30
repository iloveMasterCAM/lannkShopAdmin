<template>
  <div class="main">
    <!-- MAIN CONTENT -->
    <div class="main-content">
      <div class="container-fluid panel" id="panel">
        <div class="clearfix saerch">
          <div class="col-xs-3">
            <el-input placeholder="输入要搜索的内容"></el-input>
          </div>
          <div class="pull-left">
            <el-button type="primary">搜索</el-button>
          </div>
          <div class="pull-left">
            <el-button @click="show" type="success">添加分类</el-button>
          </div>
        </div>
        <div>
          <table width="100%">
            <tr>
              <th>  <label for="all"><input @change="allSelect" id="all" type="checkbox" name> 全选</label> </th>
              <th>ID</th>
              <th>分类名称</th>
              <th>创建时间</th>
              <th>分类排序</th>
              <th>操作</th>
            </tr>

            <tr v-for="(item,index) in row" :key="index">
                <td>
                  <input type="checkbox" :checked="checked" name :id="item.categoryId">
                </td>
              <td>{{item.categoryId}}</td>
              <td> <span v-show="contenteditable != index">{{item.categoryName}}</span> <input type="text" v-show="contenteditable == index" v-model="editVal">   </td>
              <td>1</td>
              <td>1</td>
              <td>
               
                <el-button @click="edit(index,item.categoryName)" type="primary" icon="el-icon-edit" circle></el-button>
                <el-button @click="deletei(item,index)" type="danger" icon="el-icon-delete" circle></el-button>
                <el-button @click="save(item.categoryId,index)" class="success" v-show="contenteditable == index"  type="success" icon="el-icon-success" circle></el-button>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>

    <div id="add" v-show="addBl">
      <div class="el-row text-center">
        <el-input class="pull-left" v-model="name" placeholder="请输入分类名称"></el-input>
        <el-button type="primary" @click="add">添加分类</el-button>
      </div>
    </div>
    <div id="bg" @click="show" v-show="addBl"></div>
    <!-- END MAIN CONTENT -->
  </div>
  <!-- scoped -->
</template>
<style scoped>
.main {
  position: relative;
}
#bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.2);
  z-index: 5;
}
#add {
  position: fixed;

  padding: 20px;
  background: #fff;
  top: 50%;
  left: 50%;
  margin: -150px 0 0 -200px;
  z-index: 10;
  box-shadow: 0 0 20px #eee;
}
#add > div > div {
  margin-bottom: 30px;
}
#panel {
  height: 800px;
  padding-top: 30px;
}
#panel .saerch > div {
  height: 100px;
  margin-right: 10px;
}
#panel tr {
  line-height: 40px;
  border-bottom: 1px solid #eee;
}

#panel td{
  position: relative;
}
#panel td input{
  position: absolute;
  top: 13px;
  left: 0;
  height: 25px;
  border: 1px solid #ccc;
}
#panel td, #panel .el-button.is-circle {
  padding: 6px;
}
#panel .success{
  position:absolute;
  top: 12px;
  left: 80px;
}

</style>


<script>
export default {
  data() {
    return {
      row: [],
      addBl: false,
      name:'',
      checked:false,
      contenteditable:-1,
      editVal:''
    };
  },
  methods: {
    show() {
      this.addBl = !this.addBl;
    },
    allSelect(){
       this.checked = !this.checked;
    },
    add() {
      let that = this;
      let len = that.row[that.row.length-1].categoryId+1;
      if (this.name) {
        this.axios.post(
          "productCategory/save",
          {
            categoryId: "",
            categoryName: this.name,
            categoryParentId: "",
            categoryParentIdPath: ""
          },
          function(r) {
            console.log(r);
            that.row.push({ categoryName: that.name,categoryId:len})
          }
        );
      }
    }, 

    deletei(v,i) {
      let that = this;
      var data = [];
      data.push(v);
      this.ajax.post("productCategory/delete", JSON.stringify(data), function( r ) {
      //  console.log(r);
      that.row.splice(i,1)
      });
    },
    //编辑
    edit(i,v){
      this.contenteditable = i
      this.editVal = v
      
    },
    //修改
    save(id,i){
      let that = this;
      if(id){
        this.axios.post('productCategory/save',{categoryId:id,categoryName:this.editVal},function(r){
          console.log(r)
          that.contenteditable = -1;
          that.row[i].categoryName  = that.editVal
        })
      }
       
    },
  },
  mounted() {
    let that = this;
    //productCategory/categoryByPid
    this.axios.post(
      "productCategory/categoryByPid",
      { categoryParintId: "0" },
      function(r) {
        console.log(r);
        that.row = r.d.categorys;
      }
    );
  }
};
</script>

