<template>
  <div id="app">
    <!-- el-row :gutter="20" -->
    <div id="nav" class="el-row">
       <el-col :span="4" :offset="20"><div class="grid-content bg-purple">  </div></el-col>
    </div>
    <div id="sidebar-nav" class="sidebar">
      <div class="sidebar-scroll">
        <nav>
          <ul class="nav">
            <router-link v-for="(itme, index) in nav" :key="index" :to="itme.path" tag="li" exact>
              <a v-if="itme.name == 'tables'" class="collapsed">
                <i :class="itme.icon"></i>
                <span v-text="itme.name"></span>
                <i class="iconfont icon-"></i>
              </a>
              <a v-else>
                <i :class="itme.icon"></i>
                <span v-text="itme.name"></span>
              </a>
            </router-link>
          </ul>
        </nav>
      </div>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  data(){
    return{
      nav:[
        {path:'/',name:'首页',icon:'lnr lnr-home'},
        {path:'/mine',name:'我的',icon:'lnr lnr-home'},
        {path:'/shop',name:'我的店铺',icon:'lnr lnr-home'},
        {path:'/profile',name:'商品分类',icon:'lnr lnr-home'},
        {path:'/panels',name:'配送模板1',icon:'lnr lnr-home'},
        {path:'/order',name:'订单',icon:'lnr lnr-home'},
        {path:'/specifications',name:'specifications',icon:'lnr lnr-home'},
        {path:'/mailManage',name:'mailManage',icon:'lnr lnr-home'},
        {path:'/groupBuy',name:'groupBuy',icon:'lnr lnr-home'},
        {path:'/activity',name:'activity',icon:'lnr lnr-home'}

      ]
    };
  },
  name: "App",
  methods: {

    exit(){

      if(this.token.delCookie('token')){
        this.$router.push('/login')
      }
    }
  },
  beforeCreate() {
   // console.log("A页面 beforeCreate");
  },
  created() {
  //  console.log("A页面 created");
  },
  mounted() {

      if(!this.token.getCookie("token")){
     //   this.$router.push('/login')
      }
      console.log(this.token.getCookie("token"));
   // console.log("A页面 mounted");
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  color: #2c3e50;
}
#nav {
  height: 50px;
  background: #fff;
}
.el-form-item__label{
  margin-right:40px;
}
</style>
